class Compile{
    constructor(vm) {
        this.$el = document.getElementById(vm.$opts.el)
        
        console.log(this.$el.childNodes)

        this.compile()
    }

    compile() {
        let arr = [].slice.call(this.$el.childNodes)

        console.log(arr)
    }
}