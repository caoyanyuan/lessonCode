function Batcher(){
    this.reset()
}

Batcher.prototype = {
    reset() {
        this.has = {}
        this.queue = []
        this.waiting = false
    },
    push(watcher) {
        let id = watcher.id
        if(!this.has[id]) {
            this.queue.push(watcher)
            this.has[id] = true

            if('Promise' in window) {
                Promise.resolve().then( () => {
                    this.flush()
                })
            }
        }
    },
    flush() {
        this.queue.forEach(watcher => watcher.cb())
        this.reset()
    }
}
