function defineReactive(obj, key, val) {
    observe(val)

    const dep = new Dep()
    
    Object.defineProperty(obj, key, {
        get() {
            // console.log(`get ${key}`)
            Dep.target && dep.addDep(Dep.target);
            return val
        },
        set(newVal) {
            if(newVal != val) {
                
                val = newVal
                dep.notify(val)
            }
        }
    })
}

function observe(obj) {
    if(typeof obj != 'object' || obj == null) return

    new Observer(obj)
}

class KVue{
    constructor(options) {
        this.$options = options
        this.$data = options.data

        observe(this.$data)

        //为$data做代理
        proxyData(this)

        new  Compiler(options.el, this)
    }
}

class Observer{
    constructor(value) {
        this.value = value
        //处理Object类
        this.walk(value)
    }
    walk(value) {
        Object.keys(value).forEach(key => {
            defineReactive(value, key, value[key])
        })
    }
}

function proxyData(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(newVal) {
                vm.$data[key] = newVal
            }
        })
    })
}

//监听者： 保存更新函数，
class Watcher{
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        //每次新建一个watch 默认调用一次 触发get收集依赖
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    update() {
        this.updateFn && this.updateFn.call(this.vm, this.vm[this.key])
    }
}

//收集依赖
class Dep{
    constructor() {
        this.deps = []

    }

    addDep(watcher) {
        this.deps.push(watcher)
    }   

    //通知所有变化
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}


let temp = new KVue({
    data: {
        msg: 'hello',
        a: 'xxx'
    }
})
new Watcher(temp, 'a', (val) => {
    console.log('改变了啊', val)
})
new Watcher(temp, 'a')


temp.a = 'abc'