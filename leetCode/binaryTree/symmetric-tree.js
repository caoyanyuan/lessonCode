/**
 * 101
 * 给定一个二叉树，检查它是否是镜像对称的。
 * 递归 迭代
 */

var isSymmetric = function(root) {
    if(!root) return true
    if(root.left.val == root.right.val) {
        isSymmetric(root.left)
        isSymmetric(root.right)
    }else{
        return false
    }
    return true
};

let node = {
    val: 1,
    left: {
        val: 2,
        left: { val: 3 },
        right: { right: 4 }
    },
    right: {
        val: 2,
        left: { val: 4 },
        right: { right: 3 }
    }
}

console.log(isSymmetric(node))