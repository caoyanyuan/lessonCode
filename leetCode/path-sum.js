/**
 * 
    给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
    说明: 叶子节点是指没有子节点的节点。
 */

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum2 = function(root, sum) {
    if(root.val==sum) return true

    let leftRes = rightRes = false
    if(root.left) {
        leftRes = hasPathSum(root.left, sum-root.val)
    }
    if(root.right) {
        rightRes = hasPathSum(root.right, sum-root.val)
    }
    return leftRes || rightRes
};

var hasPathSum = function(root, sum) {
    if(!root) return false
    return dfs(root, sum)
};
function dfs(root, sum) {
    console.log(root.val, sum)
    if(root.val === sum && !root.left && !root.right) return true
    let leftRes = false
    let rightRes = false
    if(root.left) {
        leftRes = dfs(root.left, sum - root.val)
    }
    if(root.right) {
        rightRes = dfs(root.right, sum - root.val)
    }
    return (leftRes || rightRes)
}

let node = {
    val: 5,
    left: {
        val: 4,
        left: {
            val: 11,
            left: { val: 7,  },
            right: { val: 2, }
        }
    },
    right: {
        val: 8,
        left: {
            val: 13,
        },
        right: { 
            val: 4, 
            right: { val: 1 }
        }
    }
}

console.log(hasPathSum(node, 22))