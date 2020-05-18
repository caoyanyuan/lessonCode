<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMessage" style="color:red">{{errorMessage}}</p>
  </div>
</template>

<script>
//Schema 就是elementui用的验证框架
import Schema from 'async-validator'
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ""
    };
  },
  mounted() {
      this.$on('validate', this.validate())
  },
  methods: {
      validate() {
          // 做校验
          const value = this.form.model[this.prop]
          const rules = this.form.rules[this.prop]
          // npm i async-validator -S
          const desc = {[this.prop]: rules};
          const schema = new Schema(desc);
          // return的是校验结果的Promise
          return schema.validate({[this.prop]: value}, errors => {
              if (errors) {
                  this.errorMessage = errors[0].message;
              }else {
                  this.errorMessage = ''
              }
              console.log(this.errorMessage)
          })
      }
  },
};
</script>
