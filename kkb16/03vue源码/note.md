难点： 

1. 正则判断插值 {{}}  以及里面的内容解析  /\{\{(.*)\}\}/.test(*node*.textContent)

   - 无限a.b.c.d 
   - a+b 等运算

2. 依赖收集

   1. defifineReactive时为每一个key创建一个Dep实例
   2. 初始化视图时读取某个key，例如name1，创建一个watcher1
   3. 由于触发name1的getter方法，便将watcher1添加到name1对应的Dep中 
   4. 当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新

3. diff算法  



