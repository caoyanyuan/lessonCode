const KKB = require("./kkb")
const app = new KKB()

app.use((ctx) => {
    console.log(ctx)
    ctx.body = "hi"
})

app.listen(3000, () => {
    console.log('listen 3000')
})