function defineReactive(obj, key, val) {
    observe(val)

    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}`)
            return val
        },
        set(newVal) {
            if(newVal != val) {
                console.log(`set ${key}: ${newVal}`);
                val = newVal
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