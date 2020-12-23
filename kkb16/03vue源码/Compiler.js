class Compiler {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if(this.$el) {
            this.compile(this.$el)
        }
    }

    compile(el) {
        const childNodes = el.childNodes

        Array.from(childNodes).forEach(node => {
            if(this.isElement(node)) {
                this.compileElement(node)
            }else if(this.isInterpolation(node)) {
                this.compileText(node)
            } 
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    //处理 k- 指令
    compileElement(node) {
        const nodeAttrs = node.attributes;
       
        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name,
                exp = attr.value
            
            if(this.isDirective(attrName)) {
                let dir = attrName.substring(2) + 'Updator'

                this[dir] && this[dir](node, exp)
            }
        })
    }

    htmlUpdator(node, exp) {
        node.textContent = this.$vm[exp]
    }
    
    clickUpdator(node, exp) {
        let fn = this.$vm.$options.methods[exp]

        node.addEventListener('click', () => {
            fn.apply(this.$vm)
        })
    }
    //k-model 双向绑定
    modelUpdator(node, exp) {
        node.value = this.$vm[exp]
        
        node.addEventListener('input', (el) => {
            this.$vm[exp] = node.value
        })
    }

    isElement(node) {
        return node.nodeType == 1
    }
    isDirective(attrName) {
        return attrName.indexOf('k-') == 0
    }

    isInterpolation(node) {
        return  node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileText(node){
        node.textContent = this.$vm[RegExp.$1]
    }
}