/**
 * 
    给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
    说明: 叶子节点是指没有子节点的节点。
 */

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }

function hasSum(node, sum){
    if (node === null) return false;

    if(node.val == sum && node.left == null && node.right==null) return true

    let leftRes = false, rightRes = false

    if(node.left) {
        leftRes = hasSum(node.left, sum - node.val)
    }
    if(node.right) {
        rightRes = hasSum(node.right, sum - node.val)
    }

    return leftRes || rightRes
    //return false
    
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

console.log(hasSum(node, 22))