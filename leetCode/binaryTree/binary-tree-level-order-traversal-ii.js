/** 107
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 * 
 */
/**
 * 
 *  BFS 是按层层推进的方式，遍历每一层的节点。题目要求的是返回每一层的节点值，所以这题用 BFS 来做非常合适。
    BFS 需要用队列作为辅助结构，我们先将根节点放到队列中，然后不断遍历队列。
    时间复杂度：O(n)
    空间复杂度：O(n) 
 */
var levelOrderBottom1 = function(root) {
    if(!root) return []
    let ret = [], queue = [root]
    while(queue.length) {
        let curr = [], temp = []

        while(queue.length) {
            let node = queue.shift()
            curr.push(node.val)
            if(node.left) temp.push(node.left)
            if(node.right) temp.push(node.right)
        }
        ret.push(curr)
        queue = temp
    }
    return ret.reverse()
};

/**
 *  DFS 是沿着树的深度遍历树的节点，尽可能深地搜索树的分支

    DFS 做本题的主要问题是： DFS 不是按照层次遍历的。为了让递归的过程中同一层的节点放到同一个列表中，
    在递归时要记录每个节点的深度 depth 。递归到新节点要把该节点放入 depth 对应列表的末尾。
 */

var levelOrderBottom = function(root) {
    let ret = []
    let dep = function(node, depth) {
        if(!node) return
        ret[depth] = ret[depth] || []
        ret[depth].push(node.val)
        depth++
        dep(node.left, depth)
        dep(node.right, depth)
    }
    dep(root, 0)
    return ret.reverse()
}

let node = {
    val: 3,
    left: {
        val: 9,
    },
    right: {
        val: 20,
        left: {
            val: 15,
        },
        right: { 
            val: 7, 
        }
    }
}

console.log(levelOrderBottom(node))