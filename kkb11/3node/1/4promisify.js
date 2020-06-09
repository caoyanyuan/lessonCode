//promisify: 如何将异步任务串行化
const repo = 'github:su37josephxia/vue-template'
const src = "../test"

clone(repo, src)

async function clone(repo, desc) {
    const { promisify } = require('util')
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    const process = ora('下载项目')

    try{
        await download(repo, src)
    } catch(error) {
        process.fail()
    }
    process.succeed()
}