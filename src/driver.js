import Tree from "./tree";

function generateRandomNumberArr(amount) {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

const tree = new Tree(generateRandomNumberArr(10));
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.postOrderCallback().forEach((value) => console.log(value));

generateRandomNumberArr(10).forEach((num) => {
  tree.insert(num);
});
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.levelOrderLoop().forEach((value) => console.log(value));
tree.prettyPrint(tree.root);
tree.preOrderCallback().forEach((value) => console.log(value));
tree.prettyPrint(tree.root);
tree.inOrderCallback().forEach((value) => console.log(value));
tree.prettyPrint(tree.root);
tree.postOrderCallback().forEach((value) => console.log(value));
