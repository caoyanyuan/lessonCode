/**
 * 98. 验证二叉搜索树
 * 
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

https://leetcode-cn.com/problems/validate-binary-search-tree

*/

var isValidBST = function(root) {
    
};

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
isValidBST(node)