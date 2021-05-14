

function Watcher(vm, key, cb) {

    this.cb = cb
    pushTarget(this)
    vm[key] //手动触发第一次
    popTarget()
}

Watcher.prototype = {
    update: function() {
        this.cb()
    }
}