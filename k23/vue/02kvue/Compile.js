class Compile{
    constructor(vm) {
        this.$el = document.getElementById(vm.$opts.el)
        this.vm = vm
        
        //console.log(this.$el.childNodes)

        return this.node2Fragment(this.$el)
    }
    node2Fragment(el) {
        let fragment = document.createDocumentFragment(),
            child = null
        
        while(child = el.firstChild) {
            this.compileElement(child)
            fragment.appendChild(child)
        }

        return  fragment

        //console.log(fragment.childNodes)
    }
    compileElement(node) {
        let reg = /\{\{(.*)\}\}/

        if(node.childNodes.length > 0) {
            [].slice.call(node.childNodes).forEach(node => this.compileElement(node))
        }else{
            
            if(node.nodeType === 1) {
                var attrs = node.attributes, self = this

                for(var i = 0; i < attrs.length; i++) {
                    if (attrs[i].nodeName == 'v-model') {
                        var name = attrs[i].nodeValue; // 获取v-model绑定的属性名
                        node.addEventListener('input', function (e) {
                          // 给相应的data属性赋值，进而触发该属性的set方法
                          //再批处理 渲染元素
                          self.vm[name] = e.target.value;
                        });
                        // node.value = vm[name]; // 将data的值赋给该node
                        new Watcher(self.vm, node, name, 'value');
                      } 
                }
            }
            if(node.nodeType === 3) {
                if(reg.test(node.nodeValue)) {
                    let name = RegExp.$1.trim()
                    
                    node.nodeValue = this.vm[name]

                    new Watcher(this.vm, name, () => {
                        node.nodeValue = this.vm[name]
                    })
                }
            }
        }

        
        

        
    }
}