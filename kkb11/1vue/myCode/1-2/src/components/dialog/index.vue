<template>
    <button @click="showDialog">点击</button>
</template>

<script>
import CreateDialog from "./createDialog"
import Dialog from "./dialog"

export default {
    methods: {
        showDialog() {
            let dialog = CreateDialog(Dialog, {
                title: "手写弹出框",
                message:"请求登录!" ,
                duration: 100000
            })
            dialog.show()
        }
    },
    components: {
        Dialog
    }
}
</script>