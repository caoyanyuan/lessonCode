
const key_dep = {}

//依赖收集 编译
class KVue{
    constructor(opts) {
        this.$opts = opts

        this.$data = opts.data

        this.observe(this.$data)
        let dom = new Compile(this)
        document.getElementById(opts.el).appendChild(dom)
    }

    observe(value) {
        if(typeof value !== 'object' || value === null) {
            return;
        }
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key])

            //将data挂载到this
            this.proxyData(key)
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(val) {
                this.$data[key] = val
            }
        })
    }

    defineReactive(obj, key, val) {
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if(newVal !== val) {
                    val = newVal

                    dep.notify()
                }
            }
        })
        this.observe(val)
    }
}

class Watcher{
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        this.vm[this.key];// 读一次key触发getter
        Dep.target = null;
    }
    update() {
        this.cb && this.cb()
    }
}

class Dep{
    constructor() {
        this.deps = []
    }
    addDep(watcher) {
        this.deps.push(watcher)
    }
    notify() {
        this.deps.map(watcher => watcher.update())
    }
}

// let vm = new KVue({
//     data: {
//         msg: "hello world"
//     },
//     el: "root"
// })
// new Watcher(vm, 'msg', () => {
//     console.log('msg change')
// })

// vm.msg = "hi"