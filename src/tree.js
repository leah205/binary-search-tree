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
class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const arr = [1, 7, 4, 23, 10, 9, 4, 3, 5, 7, 8, 67, 6345, 324];

const tree = new Tree(arr);
//tree.insert(67);
tree.insert(50);
tree.insert(9);
tree.insert(30);
tree.prettyPrint(tree.root);

console.log(tree.depth(tree.find(9)));
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

//tree.prettyPrint(tree.find(3));
/*console.log(
  tree.postOrderCallback((node) => (node.data % 2 === 0 ? "even" : "odd"))
);*/
//console.log(tree.preOrderCallback());
//console.log(tree.inOrderCallback());
//console.log(tree.postOrderCallback());

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let halfLength = Math.ceil(arr.length / 2);
  let left = mergeSort(arr.slice(0, halfLength));
  let right = mergeSort(arr.slice(halfLength, arr.length));
  let sorted = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted = sorted.concat(left.shift());
    } else {
      sorted = sorted.concat(right.shift());
    }
  }
  sorted = sorted.concat(left);
  sorted = sorted.concat(right);

  return sorted;
}
