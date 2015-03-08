# es-env-aggressive-nan

 Tracking and getting rid of all NaNs!

**WARNING!** this will turn the ECMAScript environment you're running to a non-standard one. Your own code or some dependency code may break as a result.

This piece of code is meant to be used only during development, not in production. The goal is to throw as soon as NaN appears (instead of letting NaNs flow in other places of the program).


## Install

````sh
npm install es-env-aggressive-nan --save
````


## How to use it

Just `require` it before anything else. Beware, this may break dependent packages. Use at your own risk!

````sh
require('es-env-aggressive-nan');
````


## Limitations

This script only wraps functions that may return NaN (and might take a NaN as argument). It does not cover finding when a variable is purposefully set to NaN (you do that at your own risk), nor syntactic patterns that result in NaN being generated like:

```js
var i;
console.log(+i);
```

The wrapping may result in a minor performance hit that is deemed acceptable given it is only happening in development phase and not in production.


For now, this has only been tested and used on Node.js™ 0.10.
It should work fine on 0.12 and [io.js](https://iojs.org/) but in the unlikely case you run into problems, please file an [issue](https://github.com/DavidBruant/es-env-remove-footguns/issues).


## Changes

The functions that are wrapped are:
* own properties of `Math`, `Number`, `Number.prototype`, `Date`, `Date.prototype`
* parseInt
* parseFloat
* Number
* Date
* String.prototype.charCodeAt

## Licence

ISC