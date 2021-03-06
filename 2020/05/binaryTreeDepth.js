/**
 * 计算二叉树的最大深度
 *
 * 二叉树的的深度等于左/右子树的深度的较大值加1
 */

/**
 * @desc 创建二叉树节点
 *
 * 1. 一个指向左节点的指针 left
 * 2. 一个指向右节点的指针 right
 * 3. 一个数据域，存放节点的值 val
 */
class BinaryTreeNode {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

/**
 * @desc 创建二叉树
 */
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const node = new BinaryTreeNode(val);
    let prev = this.root;
    let tail = this.root;
    // 若根节点为null，则直接插入到根节点；
    if (this.root === null) {
      this.root = node;
      return;
    }
    // tail 不为null 则进行循环，tail 为null则说明root为null，或已成为叶子节点
    while (tail) {
      prev = tail; // 将当前节点赋值给prev
      // 要插入的节点值比当前节点小
      if (node.val < tail.val) {
        tail = tail.left; // 把当前节点的 left 节点赋值给tail，用以下一次循环
      } else {
        tail = tail.right;
      }
    }

    // 当 tail 为空时，prev为最后一个节点
    if (prev.val < node.val) {
      prev.right = node;
    } else {
      prev.left = node;
    }
  }
}

const tree = new BinarySearchTree();
tree.insert(4);
tree.insert(2);
tree.insert(1);
tree.insert(3);
tree.insert(7);
tree.insert(6);
tree.insert(9);

/**
 * @desc 递归算法
 */
const maxDepth = (root) => {
  return root ? Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 : 0;
};

console.log(maxDepth(tree.root));

/**
 * @desc 迭代算法
 */
const maxDepth2 = (root) => {
  const stack = [{ key: root, val: 1 }]; // 根节点入栈

  let depth = 0;
  while (stack.length > 0) {
    let currObj = stack.pop(); // 当前节点出栈
    let currNode = currObj.key; // 获取当前节点key

    if (currNode) {
      let currNodeDepth = currObj.val; // 获取当前节点深度
      depth = Math.max(depth, currNodeDepth); // 获取较大深度，并保存

      if (currNode.left) {
        // 节点存在，则入栈，深度加1
        stack.push({ key: currNode.left, val: currNodeDepth + 1 });
      }
      if (currNode.right) {
        stack.push({ key: currNode.right, val: currNodeDepth + 1 });
      }
    }
  }

  return depth;
};

console.log(maxDepth2(tree.root));
