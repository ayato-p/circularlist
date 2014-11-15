'use strict';

var assert = require('power-assert'),
    CircularList = require('../circularlist');

describe('circularList', function(){
  var instance, actual;

  describe('initialize', function(){
    describe('new CircularList', function(){
      it('should has CircularList prototype', function(){
        instance = new CircularList();
        assert(instance instanceof CircularList);
      });
    });

    describe('not using "new"', function(){
      it('should has CircularList prototype', function(){
        instance = CircularList();
        assert(instance instanceof CircularList);
      });
    });
  });

  describe('.next', function(){
    xdescribe('', function(){

    });

    describe('with other circular list', function(){
      var instance2;
      beforeEach(function(){
        instance = CircularList();
        instance2 = CircularList();
      });

      it('', function(){
        instance.next();
        assert(instance.value() === 1);
        instance2.next();
        assert(instance.value() === 1);
      });
    });
  });

  describe('.value', function(){
    describe('calling non arguments', function(){
      it('should be return ', function(){
        instance = CircularList();
        instance.next();
        assert(instance.value() === 1);
        instance.next();
        assert(instance.value() === 2);
      });
    });

    describe('calling with iteratee', function(){
      it('should be ', function(){
        instance = CircularList([], function(x){ return x*2; });
        instance.next();
        assert(instance.value() === 2);
        instance.next().next();
        assert(instance.value() === 6);
      });
    });

    describe('calling with array and iteratee', function(){
      it('should be ', function(){
        instance = CircularList([10, 20], function(x){ return x*2; });
        instance.next();
        assert(instance.value() === 40);
        instance.next().next();
        assert(instance.value() === 40);
        instance.next();
        assert(instance.value() === 20);
      });
    });
  });

  xdescribe('.take', function(){
    describe('calling non arguments', function(){
      it('', function(){
        instance = CircularList();
        actual = instance.take(10);
        assert(actual.length === 10);
        assert.deepEqual(actual, [0,1,2,3,4,5,6,7,8,9]);
        actual = instance.take(10);
        assert(actual.length === 10);
        assert.deepEqual(actual, [10,11,12,13,14,15,16,17,18,19]);
      });
    });

    describe('calling with iteratee', function(){
      it('', function(){
        instance = CircularList(null, function(x){ return x*x; });
        actual = instance.take(5);
        assert(actual.length === 5);
        assert.deepEqual(actual, [0,1,4,9,16]);
        actual = instance.take(5);
        assert(actual.length === 5);
        assert.deepEqual(actual, [25,36,49,64,81]);
      });
    });

    describe('calling with elements', function(){
      it('', function(){
        instance = CircularList([1,3,5], function(x){ return x+1; });
        actual = instance.take(5);
        assert(actual.length === 5);
        assert.deepEqual(actual, [2,4,6,2,4]);
        actual = instance.take(5);
        assert(actual.length === 5);
        assert.deepEqual(actual, [6,2,4,6,2]);
      });
    });
  });
});

