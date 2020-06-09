const os = require('os')
const mem = os.freemem() / os.totalmem() * 100

console.log(`内存占有率${mem.toFixed(2)}`)
