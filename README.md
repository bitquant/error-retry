# error-retry
Easy error handling for async functions or any function that returns a promise.  Errors are retried with an exponential backoff delay between each attempt.

## Install
```
$ npm install error-retry
```

## Usage
```javascript
var { retry, setMaxRetries } = require('error-retry');

// Example function that just throws errors until called four times.
var exampleCount = 0;
async function example(param1, param2) {
   ++exampleCount
   console.log(`example() called param1: ${param1} param2: ${param2} try: ${exampleCount}`)
   if (exampleCount < 4) {
       throw Error('example failure')
   }
   return 'example success!'
}

(async function() {
    try {
        // Call example() with error retry handling
        var result =  await retry(() => example('abc', 123))
        console.log(`result = ${result}`)
    }
    catch (ex) {
        console.log(`ex = ${ex}`)
    }
}())
```

## Max Retries
The default number of retries is 3.  To modify this value call:
```javascript
setMaxRetries(5)
```

## License
MIT license; see [LICENSE](./LICENSE).
