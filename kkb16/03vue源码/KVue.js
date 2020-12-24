function defineReactive(obj, key, val) {
    observe(val)

    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            // console.log(`get ${key}`)

            console.log(Dep.target)
            Dep.target && dep.addDep(Dep.target);
            return val
        },
        set(newVal) {
            if(newVal != val) {
                console.log(`set ${key}: ${newVal}`);
                val = newVal
                dep.notify()
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

class Watcher{
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        console.log(this.vm[this.key])
        this.vm[this.key];// 读一次key触发getter
        Dep.target = null;
    }

    update() {
        this.cb && this.cb()
    }
}

class Dep {
    constructor() {
        this.deps = []
    }

    addDep(watcher) {
        this.deps.push(watcher)
    }

    notify() {
        console.log(this.deps)
        this.deps.map(watcher => watcher.update())
    }
}


// let temp = new KVue({
//     data: {
//         msg: 'hello',
//         a: 'xxx'
//     }
// })
// new Watcher(temp, 'a', () => {
//     console.log('改变了啊')
// })
// new Watcher(temp, 'a')


// temp.a = 'abc'