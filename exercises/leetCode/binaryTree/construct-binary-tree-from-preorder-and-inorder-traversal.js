/**
 * 105
    根据一棵树的前序遍历与中序遍历构造二叉树。
    注意:
    你可以假设树中没有重复的元素。

 
 */

function buildTree(preorder, inorder) {
    let node = { val: preorder[0] }, 
        len = preorder.length

    for(let i=1; i<len; i++) {
        node.left = inorder[i]
    }
}

let preorder = [3,9,20,15,7]
    inorder = [9,3,15,20,7]