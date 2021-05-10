
let _Vue

class Store {
    constructor(options) {
        let temp = new _Vue({
            data: {
                ...options.state
            }
        })

        this._data = temp.$data
        this.actions = options.actions
        this.mutations = options.mutations
        options.getters && this.handleGetters(options.getters)
    }

    handleGetters(getters) {
        this.getters = {}

        let self = this
        for(let key in getters) {
            Object.defineProperty(this.getters, key, {
                get() {
                    return getters[key](self._data)
                }
            })
        }
    }

    commit = (type) => {
        this.mutations[type](this._data)
    }

    get state() {
        return this._data
    }

    dispatch(type) {
        this.actions[type]({
            commit: this.commit
        })
    }   
}



let install = function(Vue){
    _Vue = Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


export default { install, Store } 