'use strict';

module.exports = ObjectMap;

/**
* This Map is just a wrapper around regular javascript object.
* It uses the fact that all javascript objects are essentially associative arrays,
* leveraging it to map keys to values.
* Any object can act as a Key. The logic to generate the string representation of the object
* must be provided in the Map constructor.
*/

function ObjectMap(stringify){

	if(typeof stringify == 'function')
    /**
  	* Method to find unique string keys for objects.
  	*/
  	this.__stringify__ = stringify;
  else throw new Error("Please specify a valid function to find string representation of the objects");

  
  /**
  * A plain old javascript object, to hold key-value pairs
  */
  this.__map__ = {};

  /**
  * A varibale to keep track of the number of key-value pairs
  * in the map
  */
  this.__size__=0;
}



  ObjectMap.prototype.put = function(object, value){
    var string = this.__stringify__(object);
    if(!this.__map__.hasOwnProperty(string))
      this.__size__+=1;
    this.__map__[string] = value;
  }

  ObjectMap.prototype.toString = function(){
    return this.__map__.toString();
  }

  ObjectMap.prototype.get = function(object){
    return this.__map__[this.__stringify__(object)];
  }

  ObjectMap.prototype.remove = function(object){
    var string = this.__stringify__(object);
    var value = this.__map__[string];
    if(this.__map__.hasOwnProperty(string))
      this.__size__-=1;
    delete this.__map__[string];
  }

  ObjectMap.prototype.forEach = function(callback){
    for(var key in this.__map__){
      callback(key, this.__map__[key]);
    }
  }

  ObjectMap.prototype.size = function(){
    return this.__size__;
  }

  ObjectMap.prototype.keys = function(){
    return this.__map__.keys();
  }

  ObjectMap.prototype.containsKey = function(object){
  	return this.__map__.hasOwnProperty(__stringify__(object));
  }
