
var delay = function(delayMs) {
    return new Promise(resolve => setTimeout(resolve, delayMs));
}

var maxRetries = 3;

function setMaxRetries(retries) {
    maxRetries = retries;
}

async function retry(dafunc) {

    for (let attempt = 0; attempt <= maxRetries; attempt++) {

        try {
            var result = await dafunc();
            break;
        }
        catch(err) {
            if (attempt < maxRetries) {
                await delay((1 << attempt) * 1000);
            }
            else {
                throw err;
            }
        }
    }

    return result;
};

exports.setMaxRetries = setMaxRetries;
exports.retry = retry;
