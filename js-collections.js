const PriorityQueue = require('./packages/queues/PriorityQueue');
const BinarySearchTree = require('./packages/trees/BinarySearchTree');

var tree= new BinarySearchTree((a,b)=>a-b);
var find = 37;
for(var i=0; i<50;i++){
	var item = Math.floor(Math.random()*100);
	tree.insert(item);
	if(i==37){
		find = item;
		console.log(item);	
	}
}

console.log(tree.root);
console.log("Searching for: ",find,tree.search(find));