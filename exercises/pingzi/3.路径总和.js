/**
 * 
    给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
    说明: 叶子节点是指没有子节点的节点。
 */

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }

//深度优先遍历
function hasSum1(node, sum){
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

//迭代
var hasSum = function(root, sum) {
    let stack = [root],
        sumStack = [sum - root.val]

    while(stack.length > 0) {
        let node = stack.pop()
        let curSum = sumStack.pop()

        if(node.left==null && node.right==null &&  curSum == 0) return true

        if(node.left) {
            stack.push(node.left)
            sumStack.push(curSum - node.val)
        }
        if(node.right) {
            stack.push(node.right)
            sumStack.push(curSum - node.val)
        }
    }

    return false
}

/**
 * 
递归（recursion）：递归常被用来描述以自相似方法重复事物的过程，在数学和计算机科学中，指的是在函数定义中使用函数自身的方法。（A调用A）
迭代（iteration）：重复反馈过程的活动，每一次迭代的结果会作为下一次迭代的初始值。（A重复调用B）
递归是一个树结构，从字面可以其理解为重复“递推”和“回归”的过程，当“递推”到达底部时就会开始“回归”，其过程相当于树的深度优先遍历。
迭代是一个环结构，从初始状态开始，每次迭代都遍历这个环，并更新状态，多次迭代直到到达结束状态。
理论上递归和迭代时间复杂度方面是一样的，但实际应用中（函数调用和函数调用堆栈的开销）递归比迭代效率要低。
 */

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