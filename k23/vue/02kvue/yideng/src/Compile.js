function Compile(el, vm) {
    return this.node2Fragment(el, vm)
}

Compile.prototype = {
    node2Fragment: function(el, vm) {
        let fragment = document.createDocumentFragment(),
            node = document.getElementById(el),
            child


        while(child = node.firstChild) {
            this.compile(child, vm)
            fragment.appendChild(child)
        }
        
        return fragment
    },
    compile(node, vm) {

        if(isElement(node)) {
            this.compileElement(node, vm)
        }
        if(isInterpolation(node)) {
            this.compileInterpolation(node, vm)
        }

        const children = node.childNodes;
        [].slice.call(children).forEach(childNode => {
            this.compile(childNode)
        })
    },

    //处理元素  div input等上的 v-model v-html @click
    compileElement(node, vm) {
        let attrs = node.attributes;
        [].slice.call(attrs).forEach(attr => {
            let name = attr.name,
                value = attr.value
            
            if(name.indexOf('v-') > -1){
                let dir = name.substring(2)

                this[dir] && this[dir]
            }
        })
    },

    //处理插值 {{}}
    compileInterpolation(node, vm) {
        let key = RegExp.$1

        new Watcher(vm, key, () => {
            node.nodeValue = vm[key]
        })

        node.nodeValue = vm[key]
    },

    model() {
        this.update()

        node.addEventListener('input', function(el){
            vm[value] = node.value
        })
    }
    
}


function isElement(node) {
    return node.nodeType === 1
}
function isInterpolation(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
}
