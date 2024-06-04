import Node from "./node";
import mergeSort from "./merge";

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.#removeDuplicates(arr);
    this.root = this.buildTree(this.arr);
  }

  #removeDuplicates(arr) {
    return arr.reduce((newArr, current) => {
      if (!newArr.includes(current)) newArr.push(current);
      return newArr;
    }, []);
  }

  buildTree(arr) {
    const sorted = mergeSort(this.#removeDuplicates(arr));
    console.log(sorted);
    return buildTreeRecursively(sorted, 0, sorted.length - 1);
    function buildTreeRecursively(arr, start, end) {
      if (start > end) return null;
      let mid = Math.floor((end + start) / 2);
      const root = new Node(arr[mid]);
      root.left = buildTreeRecursively(arr, start, mid - 1);
      root.right = buildTreeRecursively(arr, mid + 1, end);
      return root;
    }
  }

  insert(value) {
    return insertValueRecursively(this.root);
    function insertValueRecursively(root) {
      if (value > root.data) {
        if (root.right === null) root.right = new Node(value);
        else insertValueRecursively(root.right);
      } else if (value < root.data) {
        if (root.left === null) root.left = new Node(value);
        insertValueRecursively(root.left);
      }
    }
  }

  deleteItem(value) {
    const deleteItemRecursively = (root, parent, direction) => {
      if (value === root.data) {
        if (root.left === null && root.right === null) {
          parent[direction] = null;
        } else if (root.left === null) {
          parent[direction] = root.right;
        } else if (root.right === null) {
          parent[direction] = root.left;
        } else {
          const temp = findSuccessor(root.right).data;
          this.deleteItem(findSuccessor(root.right).data);
          root.data = temp;
        }
      }
      if (value > root.data) {
        if (!(root.right === null))
          deleteItemRecursively(root.right, root, "right");
      } else if (value < root.data) {
        if (!(root.left === null))
          deleteItemRecursively(root.left, root, "left");
      }
    };
    return deleteItemRecursively(this.root);
    function findSuccessor(node) {
      if (node.left === null) return node;
      else return findSuccessor(node.left);
    }
  }

  find(value) {
    function findNodeRecursively(node) {
      if (node === null) return null;
      if (node.data === value) return node;
      let leftValue = findNodeRecursively(node.left);
      if (leftValue) return leftValue;
      else return findNodeRecursively(node.right);
    }

    return findNodeRecursively(this.root);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "   |"}`, true);
    }
  }
  levelOrderLoop(callback = (node) => node.data) {
    const arr = [];
    const queue = [this.root];
    while (queue.length) {
      let current = queue.shift();
      arr.push(callback(current));
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    return arr;
  }

  preOrderCallback(callback = (node) => node.data) {
    const arr = [];
    function populateArr(node) {
      if (node === null) return;
      arr.push(callback(node));
      populateArr(node.left);
      populateArr(node.right);
    }
    populateArr(this.root);
    return arr;
  }

  inOrderCallback(callback = (node) => node.data) {
    const arr = [];
    function populateArr(node) {
      if (node === null) return;
      populateArr(node.left);
      arr.push(callback(node));
      populateArr(node.right);
    }
    populateArr(this.root);
    return arr;
  }

  postOrderCallback(callback = (node) => node.data) {
    const arr = [];
    function populateArr(node) {
      if (node === null) return;
      populateArr(node.left);
      populateArr(node.right);
      arr.push(callback(node));
    }
    populateArr(this.root);
    return arr;
  }
  height(node) {
    function findNodeHeight(node) {
      if (node.right === null && node.left === null) {
        return 0;
      } else {
        if (node.left === null) {
          return 1 + findNodeHeight(node.right);
        }
        if (node.right === null) {
          return 1 + findNodeHeight(node.left);
        }
        let leftHeight = findNodeHeight(node.left);
        let rightHeight = findNodeHeight(node.right);
        if (leftHeight > rightHeight) return 1 + leftHeight;
        return 1 + rightHeight;
      }
    }
    return findNodeHeight(node);
  }

  depth(node) {
    return this.height(this.root) - this.height(node);
  }

  isBalanced() {
    const findIsBalanced = (node) => {
      if (node.left === null && node.right === null) return true;
      else if (node.left === null) {
        return this.height(node) <= 1;
      } else if (node.right === null) {
        return this.height(node) <= 1;
      }
      return findIsBalanced(node.left) && findIsBalanced(node.right);
    };
    return findIsBalanced(this.root);
  }

  rebalance() {
    this.root = this.buildTree(this.inOrderCallback());
  }
}

export default Tree;
