'use strict';

module.exports = BinarySearchTree;

function TreeNode(key, value, left, right, parent) {
	this.key= key;
	this.value = value;
	this.left = left;
	this.right = right;
	this.parent = parent;
}

/**
* Tree which allows mapping of keys to values. A compare function is needed to compare objects for 
* ordering. An optional object can be provided to initialize the BST with an initial value.
*
* The items being stored must have a property which can be utilized by the compare function
* to decide ordering of the items being mapped by the key.*. 
*/
function BinarySearchTree(compare){
	if(typeof compare == 'function')
		this.__compare__ = compare;
	else throw new Error('Please specify a valid function to decide ordering of keys stored in the BST.');

	this.__size__=0;
	this.__root__=null;

	this.__find__ = function find(root, key){
		if(compare(root.key, key) < 0)
			return find(root.right, key);
		else if(compare(root.key, key) > 0)
			return find(root.left, key);
		else if(root ==null)
			return null;
		else if(compare(root.key, key) == 0)
			return root.key;
	}
}

/**
* @param key - the key to insert. 
* @return true if the object was inserted without replacing an existing object, 
* false if it was inserted by replacing an exisitng object.
*/
BinarySearchTree.prototype.insert = function(key, value){
	if(this.__root__ == null){
		this.__root__ = new TreeNode(key, value, null, null, null);
		this.__size__++;
		return true;
	}

	var root = this.__root__;
	var compare = this.__compare__;
	while(true){
		if(compare(root.key, key) > 0){
			if(root.left == null){
				root.left = new TreeNode(key, value, null,null, root);
				this.__size__++;
				return true;
			} else root= root.left;
		}
		else if(this.__compare__(root.key, key) < 0){
			if(root.right == null){
				root.right = new TreeNode(key,null,null, root);
				this.__size__++;
				return true;
			} else root = root.right;
		}
		else if(this.__compare__(root.key, key) == 0){
			root.key = key;
			return false;
		}
	}
}

/**
* returns an array with keys traversed in order.
**/
BinarySearchTree.prototype.traverseInOrder = function(){
	function inorder(root, keys){
		if(root == null)
			return;
		inorder(root.left, keys);
		keys.push(root.key);
		inorder(root.right, keys);
	}
	var root = this.root;
	var keys = [];
	inorder(root, keys);
	return keys;
}

/**
* 
* returns an array with keys traversed pre order.
*/
BinarySearchTree.prototype.traversePreOrder = function(){
	function preorder(root, keys){
		if(root == null)
			return;
		keys.push(root.key);
		preorder(root.left, keys);
		preorder(root.right, keys);
	}
	var root = this.root;
	var keys = [];
	preorder(root, keys);
	return keys;
}

/**
* 
* returns an array with keys traversed post order.
*/
BinarySearchTree.prototype.traversePostOrder = function(){
	function postorder(root, keys){
		if(root == null)
			return;
		postorder(root.left, keys);
		postorder(root.right, keys);
		keys.push(root.key);
	}
	var root = this.root;
	var keys = [];
	postorder(root, keys);
	return keys;
}

/**
* 
* @param key wrapped inside an object which can be compared with other objects in this BST
* using the compare function specified in the constructor.
* @return the object associated with the key.
*/
BinarySearchTree.prototype.search = function(key){
	var find = this.__find__;
	var compare = this.__compare__;
	var root = this.root;
	return find(root, key);
}


/**
* @param key wrapped inside an object which can be compared with other objects in this BST
* using the compare function specified in the constructor. 
* @return true if the object with the specified key was found and deleted.
* false if the object was not found.
*/
BinarySearchTree.prototype.delete = function(key){
	var compare = this.__compare__;
	var find = this.__find__;
	var root = this.root;
	var found = find(root, key);
	if(found){
		if(found.left == null && found.right == null){

		}
		return true;
	}
	return false;
}





