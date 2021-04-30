let _Vue

export default class CRouter {
    constructor({routes}) {
        this.routes = routes
        this.routeMap = {}

        this.bindHashChange()
        this.collectRouteMap()

        this.current = window.location.hash.slice(1)
    } 

    bindHashChange() {
        _Vue.util.defineReactive(this, 'current')

        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1)
        })
    }

    collectRouteMap() {
        for(let i = 0; i < this.routes.length; i++) {
            let route = this.routes[i]
            this.routeMap[route.path] = route.component
        }
    }
}

CRouter.install = function(Vue) {
    _Vue = Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    Vue.component('router-link',{
        props: {
            to: {
                require: true,
                type: String
            }
        },
        render(h){
            return h('a', {
                attrs: {
                    href: '#'+this.to
                }
            }, this.$slots.default)
        }
    })
    Vue.component('router-view',{
        render(h){
            let comp = this.$router.routeMap[this.$router.current]
            return h(comp)
        }
    })
}



