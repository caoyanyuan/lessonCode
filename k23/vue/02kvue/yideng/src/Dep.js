//进行依赖收集
function Dep() {
    this.deps = []
}

Dep.prototype = {
    depend: function() {
        //js单线程。Dep.target就是一个全局的变量
        Dep.target && this.deps.push(Dep.target)
    },
    notify: function() {
        this.deps.forEach(watcher => watcher.update())
    }
}

function pushTarget(_target) {
    Dep.target = _target
}

function popTarget(_target) {
    Dep.target = null
}
