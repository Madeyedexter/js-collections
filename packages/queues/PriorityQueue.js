'use strict';

module.exports = PriorityQueue;

function PriorityQueue(compare){
  // an array whose elements are indexed from 1, pushing null intentionally to occupy the zeroth index.
  var _array = [null], _compare;
  if(typeof compare == 'function')
    _compare = compare;
  else throw new Error("Please specify a valid function to compare priorities of elements in the priority queue.");

  /**
  * Inserts the node into the queue, maintaining it's priority.
  * Priority is decided by using the compare function passed in via constructor.
  */
  this.insert = function(node){
    _array.push(node);
    _heap_increase_key(_array.length - 1);
  }

  /**
  * removes and returns the next element in the queue. If the queue is empty
  * undefined is returned.
  */
  this.poll = function(){
    if(this.size() > 0){
      var new_length = _array.length - 1;
      var first = _array[1];
      _array[1] = _array[new_length];
      _array.length = new_length;
      if(_array.length > 1){
        _heapify(1);
      }
      return first;
    }
    return undefined;
  }

  /**
  * returns, but does not removes, the next element.
  */
  this.peek = function(){
    return _array[1];
  }

  /**
  * returns the number of elements in this queue.
  */
  this.size = function(){
    return _array.length - 1;
  }

  /**
  * returns true if the queue is empty, false otherwise.
  */
  this.isEmpty = function(){
    return this.size() == 0;
  }

  /**
  * returns a strin representation of this queue.
  */
  this.toString = function(){
  	return '['+String(_array.splice(1))+']';
  }

  /**
  * Increases priority of an element.
  * @input element: The element whose prority should be increased.
  * @input elements_equal: a function, with two parameters, returning
  * 0 if elements are equal, less than 0 if first is smaller than second, 
  * and greater than 0 if first is larger than second.
  */
  this.increase_priority = function(element, elements_equal){
    var position = -1;
    for(var index=1; index < _array.length; index++)
      if(elements_equal(_array[index], element)){
        position = index;
        break;
      }
    if(position != -1){
      _array[position] = element;
      _heap_increase_key(position);
    }
  }

  function _swap(i, j){
    var temp = _array[i];
    _array[i]=_array[j];
    _array[j]=temp;
  }

/**
* moves the key at index i up recursively, until the heap
* property is satisfied.
*/
  function _heap_increase_key(i){
    var parent = _parent(i);
    // swap with parent until max-heap or min-heap property is not satisfied.
    while(i > 1 && _compare(_array[parent], _array[i]) > 0 ){
      _swap(parent, i);
      i = parent;
      parent = _parent(i);
    }
  }

  /**
  * Sifts down the element at position i, until the Heap property is satisfied.
  **/
  function _heapify(i){
    var newIndex = i;
    var left_child = _left_child(i);
    var right_child = _right_child(i);
    if(left_child < _array.length && _compare(_array[left_child], _array[newIndex]) < 0)
      newIndex = left_child;
    if(right_child < _array.length && _compare(_array[right_child], _array[newIndex]) < 0)
      newIndex = right_child;
    if(newIndex != i){
      _swap(newIndex, i);
      _heapify(newIndex);
    }
  }
  
  /**
  * returns the parent index of the input index
  */
  function _parent(i){
    return i >> 1;
  }

  /**
  * returns the left child's index of the input index
  */
  function _left_child(i){
    return i << 1;
  }

  /**
  * returns the right child's index of the input index
  */
  function _right_child(i){
    return i << 1 | 1;
  }
}