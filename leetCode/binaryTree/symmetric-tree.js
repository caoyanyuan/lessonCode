/**
 * 101
 * 给定一个二叉树，检查它是否是镜像对称的。
 * 递归 迭代
 */

//递归 深度遍历
var isSymmetric1 = function(root) {
    if(root === null) return true;
    const isSame = (left, right) => {
        if(left == null && right == null) return true
        if(left == null || right == null) return false

        if(left.val == right.val) {
            return isSame(left.left,right.right) && isSame(left.right, right.left)
        }
        return false
    }

    return isSame(root.left, root.right)
};

// 迭代 层序遍历每一层节点  判断每一层是否对称
var isSymmetric2 = function(root) {
    if (root === null) return true;
    let node = root;
    let queue = [node];
    while (queue.length > 0) {
        if (!isSame(queue)) {
            return false;
        }
        let len = queue.length;
        for (let i = 0; i < len; i++) {
            node = queue.shift();
            if (node !== null) {
                queue.push(node.left);
                queue.push(node.right);
            }
        }
    }
    return true
};

function isSame(arr) {
    let left = 0, right = arr.length-1;
    while (left < right) {
        if (arr[left] === null || arr[right] === null) {
            if (arr[left] !== arr[right]) {
                return false;
            }
        } else {
            if (arr[left].val !== arr[right].val) {
                return false;
            }
        }
        left++;
        right--;
    }
    return true;
}

// 迭代 栈处理
/**
 利用栈来记录比较的过程，实际上，递归就使用了调用栈，所以这里我们可以使用栈来模拟递归的过程
    首先根的左右子树入栈
    将左右子树出栈，比较两个数是否互为镜像
    如果左右子树的根节点值相等，则将左子树的 left 、右子树的 right 、左子树的 right 、右子树的 left 依次入栈
    继续出栈（一次出栈两个进行比较）…….
    依次循环出栈入栈，直到栈为空
 */

var isSymmetric = function(root) {
    if(root == null) return true

    
    let stack = [root.left, root.right]

    while(stack.length) {
        let left = stack.pop(), right = stack.pop()

        if(left && right) {
            if(left.val !== right.val) return false

            stack.push(left.left, right.right, left.right, right.left)
        }else if(left || right){
            return false
        }
    }

    return true
}

let node = {
    val: 1,
    left: {
        val: 2,
        left: { val: 3, left: null, right: null},
        right: { val: 4, left: null, right: null }
    },
    right: {
        val: 2,
        left: null,
        right: { val: 3 , left: null, right: null}
    }
}

console.log(isSymmetric(node))


//https://github.com/sisterAn/JavaScript-Algorithms/issues/53