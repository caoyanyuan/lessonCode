/**
 * 144. 二叉树的前序遍历
 * 给定一个二叉树，返回它的 前序 遍历。
 * 
 */

//递归实现
var preorderTraversal_1 = function(root) {
    if(!root) return []

    let ret = []
    function preorder(node, cb) {
        if(node) {
            ret.push(node.val)
            preorder(node.left, cb)
            preorder(node.right, cb)
        }
    }
    preorder(root)
    return ret
};

//迭代实现
var preorderTraversal = function(root) {
    let ret = [],
        stack = []
    
    if(root) stack.push(root)
    while(stack.length > 0) {
        //1. 先访问根节点
        let node = stack.shift()

        ret.push(node.val)
        //2. 左节点入栈
        if(node.left) stack.push(node.left) 
        //3. 右节点入栈
        if(node.right) stack.push(node.right) 
    }
    return ret
}



let node = {
    val: 1,
    left: {
        val: 4,
        left: {
            val: 2,
        }
    },
    right: {
        val: 3
    }
}

console.log(preorderTraversal(node))