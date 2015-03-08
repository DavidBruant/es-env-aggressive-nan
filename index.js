"use strict";

/*
    Wrap all functions that may return NaN so they throw instead.
*/


// Number.isNaN may be wrapped. Cache it just in case.
var accurateIsNaN = Number.isNaN;

function wrapAndThrowOnNaN(f){
    
    // TODO change function.name and function.length
    
    return function(){
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(a, i){
            if(accurateIsNaN(a))
                throw new TypeError(i+'-th argument is NaN');
        });
        
        var ret = f.apply(this, args);
        
        if(accurateIsNaN(ret))
            // args.join(', ') may have side effects because of conversion to string
            throw new TypeError('NaN returned by function '+f.name+'. Arguments: ['+args.join(', ')+']');
        
        return ret;
    }
    
}


[ // wrap all functions which are own properties of these objects
    Math,
    Number,
    Number.prototype,
    Date,
    Date.prototype
].forEach(function(obj){
    Object.getOwnPropertyNames(obj).forEach(function(name){
        // don't wrap some functions
        if(obj[name] === Number.isNaN)
            return;
        
        if(typeof obj[name] === 'function')
            Object.defineProperty(obj, name, {value: wrapAndThrowOnNaN(obj[name])})
    });
});

global.parseInt = wrapAndThrowOnNaN(global.parseInt);
global.parseFloat = wrapAndThrowOnNaN(global.parseFloat);

String.prototype.charCodeAt = wrapAndThrowOnNaN(String.prototype.charCodeAt);

