function observe(obj, vm) {
    Object.keys(obj).forEach(key => {
        defineReactive(vm, key, obj[key])
    })
}
function defineReactive(vm, key, val) {
    const dep = new Dep()

    Object.defineProperty(vm, key, {
        get() {
            dep.depend()
            return vm.data[key]
        },
        set(newValue) {
            if(val !== newValue) {
                vm.data[key] = newValue
                dep.notify()
            }
        }
    })
}