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
var isSymmetric = function(root) {
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


let node = {
    val: 1,
    left: {
        val: 2,
        left: { val: 3, left: null, right: null},
        right: { val: 4, left: null, right: null }
    },
    right: {
        val: 2,
        left: { val: 4, left: null, right: null},
        right: { val: 3 , left: null, right: null}
    }
}