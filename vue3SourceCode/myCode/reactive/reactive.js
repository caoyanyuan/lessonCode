const toProxy = new WeakMap()
const toRaw = new WeakMap()

let effectStack = [] //存储effect的地方
let targetMap = new WeakMap() // 特殊的{} key是object 存储 { target: depMap 关联 effect }

//收集依赖
function track(target, key) {
    const effect = effectStack[effectStack.length - 1]

    if(effect) {
        let depMap = targetMap.get(target)
        if(depMap==undefined) {
            depMap = new Map()
            targetMap.set(target,depMap)
        }
        
        let dep = depMap.get(key)     // obj.count  target是obj，key是count
        console.log(dep, key)
        if(dep==undefined){
            dep = new Set()
            depMap.set(key, dep)
        }
        // 双向存储无处不在，优化的原则
        if(!dep.has(effect)){
            dep.add(effect)
            effect.deps.push(dep)
        }

        console.log(targetMap)
    }
}

//触发相关依赖effect执行更新更新
function trigger(target, key, info) {
    // 触发更新
    // 寻找target里面的依赖effect函数
    const depMap = targetMap.get(target)
    if(depMap===undefined){
        // 没有依赖
        return 
    }
    const effects = new Set()
    const computedRunners = new Set()

    if(key){
        let deps = depMap.get(key)
        // deps里面全部仕effect
        deps.forEach(effect=>{
            // effect()
            if(effect.computed){
                computedRunners.add(effect)
            }else{
                effects.add(effect)
            }
        })
    }
    console.log(effects)
    console.log(computedRunners)
    effects.forEach(effect=>effect())
    computedRunners.forEach(computed=>computed())
}

//effect就是相应要做的操作
function effect(fn, options={}) {
    // 其实就是往effectStack push了一个effect函数，执行fn
    let e = createReactiveEffect(fn, options)

    if(!options.lazy) {
        e()
    }
    return e
} 

function createReactiveEffect(fn, options) {
    let effect = function effect(...args) {
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy

    return effect
}

function run(effect, fn, args) {
    if(effectStack.indexOf(effect)===-1){
        try{
          effectStack.push(effect)
          return fn(...args) // 执行 执行的时候，是要获取的
        }finally{
          effectStack.pop() // effect用完就要推出去
        }
    }
}

//let o = { name: aaa } 
//Proxy的好处： 可以监听一切对象 比如arr.length = 0 vue2监听不到这个
const baseHandler = {
    //target： o
    get(target, key) {
        const res = Reflect.get(target, key)
        //收集依赖 
        track(target, key);
        return typeof res == 'object'?reactive(res):res
    },
    set(target, key, val) {
        const info = { oldVal: target[key], newVal: val }
        //触发更新
        console.log(info)
        const res = Reflect.set(target,key,val)
        trigger(target, key, info)
        return res
    }
}

//计算属性
function computed(fn) {
    const runner = effect(fn, { computed:true,lazy:true })

    return {
        effect:runner,
        get value(){
          return runner()
        }
    }
}

//响应式 
function reactive(target) {
    let observed = toProxy.get(target)

    if(observed) {
        return observed
    }
    if(toRaw[target]) {
        return target
    }

    observed = new Proxy(target, baseHandler) 
    return observed
}



