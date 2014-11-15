'use strict';
;(function(definition){
  // CommonJS
  module.exports = definition();

})(function(){
  var CircularList = function(elements, iteratee){
    var x = this;

    var identity = function(x){ return x; };

    if(!(x instanceof CircularList)){
      return new CircularList(elements, iteratee);
    }

    x.i = 0;

    x.elements = (function(){
      if(Object.prototype.toString.call(elements) === '[object Array]'){
        return elements;
      }
      return [];
    })();

    x.iteratee = (function(){
      if(Object.prototype.toString.call(iteratee) === '[object Function]'){
        return iteratee;
      }
      return identity;
    })();

    return x;
  };

  var p = CircularList.prototype;

  p.next = function(){
    this.i++; return this;
  };

  p.value = function(){
    var t = (this.elements.length === 0) ? this.i : this.elements[this.i % this.elements.length];
    return this.iteratee(t);
  };

  p.take = function(n){
    if(!n || typeof n !== 'number'){ throw TypeError(); }
    if(n < 0){ throw new RangeError(); }

    var result = [];
    for(var i = 0; i < n; i++){
      result.push(this.value());
      this.next();
    }
    return result;
  };

  return CircularList;
});

