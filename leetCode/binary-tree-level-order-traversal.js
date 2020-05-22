/**
 * 102 和 107非常相似
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）
 * 
 */
// dfs
var levelOrder1 = function(root) {
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
    return ret
};

//bfs
var levelOrder = function(root) {
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
    return ret
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

console.log(levelOrder(node))

/**
 * 结果
[
  [3],
  [9,20],
  [15,7]
]
 */