// Proxy 可以拦截所以的操作 不需要$set
//   支持全部的数据格式， Map
//   懒收集
    // 自带能力
// defineProperty
//   初始化的时候，全部递归完毕
//   数组需要单独拦截
//   对象新增和删除属性，不能拦截

const baseHandler = {
    get(target, key) {
        const res = Reflect.get(target, key)
        // 尝试获取值obj.age, 触发了getter  每一次获取都是一次依赖
        track(target, key)
        return typeof res == "object" ? reactive(res) : res
    },
    set(target, key, val) {
        const info = { oldVal: target[key], newVal: val }
        Reflect.set(target, key, val)
        // @todo 响应式去通知变化 触发执行effect
        trigger(target,key,info)
    }
}

function reactive(target) {
    const observed = new Proxy(target, baseHandler)

    return observed
}

function computed(fn) {
    let runner = createReactiveEffect(fn, {lazy: true,computed: true})

    return {
        effect: runner,
        get value() {
            return runner()
        }
    }
}

function effect(fn, opts = {}) {
    let e = createReactiveEffect(fn, opts)

    if(!opts.lazy) {
        e()
    }
}
// 构造固定格式的effect
function createReactiveEffect(fn, opts) {
    const effect = function effect(...args){
        return run(effect,fn,args)
    }
    // effect的配置
    effect.deps = []
    effect.computed = opts.computed
    effect.lazy = opts.lazy
    return effect
}

function run(effect, fn, args) {
    //这里是最后一步执行  
    if(effectStack.indexOf(effect) === -1){
        try{
            //如果在effect里执行了obj.age，会触发track收集effect 
            effectStack.push(effect)
            return fn(...args)
        }finally{
            effectStack.pop()
        }
    }
}

let effectStack = []  // 存储effect
let targetMap = new WeakMap()


/* 怎么收集依赖，用一个巨大的targetMap来收集
// {
    WeakMap
//   key: { name:'kkb',age:'1' },
     value: [
         //Map
         {
             key: 'name',
             value: 
                //Set
                [...effect函数]
         }
     ]
} */

function track(target, key){
    //拿到当前运行的effect函数， 这个函数式由obj.key操作产生的 把key和effect对应起来了
    const effect = effectStack[effectStack.length - 1]
    
    if(effect) {
        let depMap = targetMap.get(target)
        if(depMap===undefined) {
            depMap = new Map()
            targetMap.set(target, depMap)
        }
        let dep = depMap.get(key)
        if(dep===undefined){
            dep = new Set()
            depMap.set(key, dep)
        }
        if(!dep.has(effect)){
            dep.add(effect)
            effect.deps.push(dep)
        }
    }
}

function trigger(target, key) {
    const depMap = targetMap.get(target)

    if(depMap===undefined) {
        return
    }

    const effects = new Set()
    const computedRunners = new Set()

    // 分开，普通的effect，和computed又一个优先级
    // effects先执行，computed后执行
    // 因为computed会可能依赖普通的effects
    if(key) {
        let deps = depMap.get(key)
        deps.forEach(effect => {
            if(effect.computed) {
                computedRunners.add(effect)
            }else{
                effects.add(effect)
            }
        })
        effects.forEach(effect => effect())
        computedRunners.forEach(computed => computed())
    }
}
