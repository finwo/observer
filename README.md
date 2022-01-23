# @finwo/observer

Get triggered on deep updates, without dependencies

When nested objects are accessed, a new obeserver is returned for the nested
object, instead of the object itself. This allows deep path observations in
complex objects.

Nothing is mapped, objects are wrapped on-demand, making sure the original
object is not polluted with proxies.

## Usage

```js
import { observer } from '@finwo/observer'; // observer has a named export
import observer from '@finwo/observer';     // and is the default export as well

// Create an example object and observe it
const org   = {subject:'world',greeting:'hello',meta:{type:'test'}};
const meta  = org.meta;
const state = JSON.stringify(org);
const obs   = observer(org, (...chain) => {
  // This handler is called AFTER the target has been modified

  // Show update in console
  console.log('Update:');
  console.log('  Path:', chain.map(node => node.prop).join('.'));
  console.log('  Old :', chain[chain.length - 1].oldValue);
  console.log('  New :', chain[chain.length - 1].value);

  // Update the state
  state = JSON.stringify(org);
});

// The original object is not modified at this point
console.log(org.meta === meta); // true

// Update values
obs.subject = 'universe'; // Shows update
```

## License

Copyright © 2021 App-vise B.V.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
