class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if(this.$el) {
            //遍历所有的节点到fragment
            this.$fragment = this.node2Fragment(this.$el)

            //编译fragment
            this.compile(this.$fragment)

            this.$el.appendChild(this.$fragment)
        }
    }

    //   遍历el,把里面内容搬到新创建fragment中
    node2Fragment(el) {
        const fragment = document.createDocumentFragment();
        let child;
        while ((child = el.firstChild)) {
            // 由于appenChild是移动操作
            fragment.appendChild(child);
        }
        return fragment;
    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if(this.isElement(node)) {
                //编译元素 
                this.compileElement(node)
            }else if(this.isInterpolation(node)){
                //编译插值文本
                this.compileText(node)
            }

            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    isElement(node) {
        return node.nodeType === 1
    }
    isInterpolation(node) {
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    // 处理 k-text k-html  k-model / @click
    compileElement(node) {
        let nodeAttrs = node.attributes

        Array.from(nodeAttrs).forEach(attr => {
            let name = attr.name //k-text
            let value = attr.value   //msg
            if(name.indexOf('k-') > -1) {
                let dir = name.substring(2)

                this[dir] && this[dir](node, this.$vm, value)
            }else if(name.indexOf('@') > -1) {
                let methodName = name.substring(1)

                console.log(node, value, methodName,)
                this.eventHandler(node, value, methodName, this.$vm)
                
            }
        })
    }

    text(node, vm, exp) {
        this.update(node, vm, exp, 'text')
    }
    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }
    model(node, vm, exp) {
        this.update(node, vm, exp, 'model')

        node.addEventListener('input', (e) => {
            vm[exp] = e.target.value
        })
    }
    
    compileText(node) {
        const exp = RegExp.$1;
        
        this.update(node, this.$vm, exp, "text")
    }

    update(node, vm, exp, dir) {
        const fn = this[dir+'Updator']
        
        fn && fn(node, vm[exp] )

        new Watcher(vm, exp, function() {
            fn && fn(node, vm[exp]);
        });
    }

    textUpdator(node, value) {
        node.textContent = value
    }

    htmlUpdator(node, value) {
        node.innerHTML = value
    }
    modelUpdator(node, value) {
        node.value = value
    }

    eventHandler(node, methodName, methoType, vm) {
        let fn = vm.opts.methods[methodName]
        if(fn) {
            node.addEventListener(methoType, fn.bind(vm))
        }
    }

}