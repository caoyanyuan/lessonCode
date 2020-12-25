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
                let dir = attrName.substring(2)

                this[dir] && this[dir](node, exp)
            }
        })
    }

    update(node, exp, type) {
        let fn = this[type+'Updater']

        //初始化设置
        fn && fn(node, this.$vm[exp])

        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }

    html(node, exp) {
        this.update(node, exp, 'html')
    }
    htmlUpdater(node, val) {
        node.innerHTML = val
    }
    textUpdater(node, val) {
        node.textContent = val
    }
    modelUpdater(node, val) {
        node.value = val
    }
    
    click(node, exp) {
        let fn = this.$vm.$options.methods[exp]

        node.addEventListener('click', () => {
            fn.apply(this.$vm)
        })
    }
    //k-model 双向绑定
    model(node, exp) {
        this.update(node, exp, 'model')
        
        node.addEventListener('input', () => {
            this.$vm[exp] = node.value
        })
    }

    compileText(node){
        this.update(node, RegExp.$1, 'text')
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

}
   