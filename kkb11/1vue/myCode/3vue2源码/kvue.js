class KVue {
    constructor(opts) {
        this.opts = opts

        this.$data = opts.data

        this.observe(this.$data)
    }   

    observe(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            //把data数据代理到this中
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

    defineReactive(data, key, val) {
        const dep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                console.log(Dep.target)
                Dep.target && dep.addDep(Dep.target);
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal;
                    dep.notify();
                }
            }
        })
    }
}

class Watcher{
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        // this.vm[this.key];// 读一次key触发getter
        // Dep.target = null;
    }

    update() {
        console.log(`${this.key}属性更新了`);
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

let temp = new KVue({
    data: {
        msg: 'hello',
        a: 'xxx'
    }
})
new Watcher(this, 'a')
temp.a
temp.a = 2
new Watcher(this, 'msg')
temp.msg
temp.msg = 2


