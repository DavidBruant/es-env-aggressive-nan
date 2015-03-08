"use strict";

require('../index.js');

var assert = require('chai').assert;

describe('basic', function(){

    it('should see Math.sqrt(-1) throw, but Math.sqrt(4) === 2', function(){
        assert.throw(function(){
            return Math.sqrt(-1);
        }, TypeError);
        
        assert.strictEqual(Math.sqrt(4), 2);
    });

});