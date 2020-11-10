// 学习了解二叉树 排序二叉树

class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }
}

class BinaryTree {
    constructor() {
        this.root = null
    }
    insert(val) {
        let newNode = new Node(val)

        if(!this.root) {
            this.root = newNode
        }else{
            this._insertNode(this.root, newNode)
        }
    }

    _insertNode(node, newNode) {
        if(node.val > newNode.val) {
            if(!node.left) {
                node.left = newNode
            }else{
                this._insertNode(node.left, newNode)
            }
        }else{
            if(!node.right) {
                node.right = newNode
            }else{
                this._insertNode(node.right, newNode)
            }
        }
    }

    //中序遍历 [0, 2, 3, 5, 7, 8, 10, 12] 先输出当前结点的左节点，在输出当前节点和右节点
    inOrder() {
        let ret  = []
        this._inOrderNode(this.root, (n) => {
            ret.push(n)
        })
        console.log(ret)
    }

    _inOrderNode(node, callback) {
        if(node) {
            this._inOrderNode(node.left, callback)
            callback(node.val)
            this._inOrderNode(node.right, callback)
        }
        
    }

    //前序遍历   [8, 5, 3, 0, 2, 7, 10, 12]  先输出当前结点的数据，再依次遍历输出左结点和右结点
    preOrder() {
        let ret  = []
        this._preOrderNode(this.root, (n) => {
            ret.push(n)
        })
        console.log(ret)
    }

    _preOrderNode(node, callback) {
        if(node) {
            callback(node.val)
            this._preOrderNode(node.left, callback)
            this._preOrderNode(node.right, callback)
        }
    }

    //后序遍历  [2, 0, 3, 7, 5, 12, 10, 8] 先输出当前结点的左节点，在输出右节点和当前节点
    postOrder() {
        let ret  = []
        this._postOrderNode(this.root, (n) => {
            ret.push(n)
        })
        console.log(ret)
    }

    _postOrderNode(node, callback) {
        if(node) {
            this._postOrderNode(node.left, callback)
            this._postOrderNode(node.right, callback)
            callback(node.val)
        }
    }
 
    //层序遍历 按层次输出每一层的节点
    levelOrder(root) {
        let queue = [root], ret = [], node

        while(queue.length) {
            let len = queue.length
            
            for(let i=0; i<len; i++) {
                node = queue.shift()
                ret.push(node.val)
                if(node.left) queue.push(node.left)
                if(node.right) queue.push(node.right)
            }
        }

        return ret
    }

    //寻找最大节点
    max() {
        return this._maxNode(this.root)
    }
    _maxNode(node) {
        if(node) {
            while(node && node.right) {
                node = node.right
            }
            return node.val
        }
        return null
    }

    //移除节点： 
    remove(val) {
        if(val) {

        }
    }

    //查找节点
    search(val) {
        let ret = null
        this._searchNode(this.root, val, (node) => {
            ret = node
        })
        return ret
    }

    _searchNode(node, val, callback) {
        if(node) {
            if(val < node.val) {
                this._searchNode(node.left, val, callback)
            }else if(val > node.val){
                this._searchNode(node.right, val, callback)
            }else{
                callback(node)
            }
        }
    }

    //删除节点
    remove(val) {
        this._removeNode(this.root, val)
    }

    _removeNode(node, val) {
        if(node) {
            if(val < node.val) {
                node.left = this._removeNode(node.left, val)
                return node
            }else if(val > node.val) {
                node.right = this._removeNode(node.right, val)
                return node
            }else{
                //叶子节点
                if(node.right == null && node.left == null) {
                    node = null
                    return node
                }
                //有一个子节点的节点， 
                if(node.left == null) {
                    node = node.right
                    return node
                }else if(node.right == null) {
                    node = node.left
                    return node
                }
                //left和right都有的节点： 当前节点的值为 right里面最小的值minNode，且删除minNode
                let minNode = this.findMinNode(node.right)
                node.val = minNode.val
                node.right = this._removeNode(node.right, minNode.val)
            }
        } 
    }

    findMinNode(node) {
        if(node) {
            while(node.left) {
                node = node.left
            }
            return node
        }
    }
    
}



let tree = new BinaryTree()

let node = [ 8,5,3,7,6,10,12 ]

node.map(val => tree.insert(val))

console.log(tree)
console.log(tree.remove(5))



