/**
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 * 104. 二叉树的最大深度
 * 给定一个二叉树，找出其最大深度。
 * 
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 */

var maxDepth = function(root) {
    if(root==null) return 0

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

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