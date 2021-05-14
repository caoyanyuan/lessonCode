
let uid = 0
function Watcher(vm, key, cb) {

    this.cb = cb
    this.id = ++uid
    pushTarget(this)
    vm[key] //手动触发第一次
    popTarget()
}

Watcher.prototype = {
    update: function() {
        if(!batcher) batcher = new Batcher()

        batcher.push(this)
        //this.cb()
    }
}