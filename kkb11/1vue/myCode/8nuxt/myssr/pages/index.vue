<template> 
    <div> 
      <h2>商品列表</h2> 
      <ul>
        <li v-for="good in goods" :key="good.id" > 
          <nuxt-link :to="`/detail/${good.id}`"> 
              <span>{{good.text}}</span> 
              <span>￥{{good.price}}</span> 
            <button @click.prevent="addCart(good)">加购物车</button> 
          </nuxt-link> 
            </li> 
      </ul> 
      </div> 
</template> 
<script>
export default {
  async asyncData({ $axios, error }) { 
    const {ok, goods} = await $axios.$get("/api/goods"); 
    
    if (ok) { return { goods }; }
    // 错误处理 
    error({ 
        statusCode: 400, 
        message: "数据查询失败" 
    }); 
  },
  head() { 
    return { 
      title: "aaa", 
      meta: [
        { name: "description", hid: "description", content: "set page meta" }
      ], 
      link: [
        { rel: "favicon", href: "favicon.ico" }
      ], 
    }; 
  },
  data() {
    return {
      goods: [
        { id: 1, text: "Web全栈架构师", price: 8999 },
        { id: 2, text: "Python全栈架构师", price: 8999 }
      ]
    };
  },
  methods: { addCart() {} }
};
</script>