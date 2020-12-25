难点： 

1. 正则判断插值 {{}}  以及里面的内容解析  /\{\{(.*)\}\}/.test(*node*.textContent)

   - 无限a.b.c.d 
   - a+b 等运算

2. 依赖收集

   1. defineReactive时为每一个key创建一个Dep实例
   2. 初始化视图时读取某个key，例如name1，创建一个watcher1
   3. 由于触发name1的getter方法，便将watcher1添加到name1对应的Dep中 
   4. 当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新

ps: 这里一个key对应一个watcher。。会使得项目常见很多个watcher 是vue1.0的做法，，使得页面变得很慢。
   所以vue2.0是一个组件对应一个watcher。。加入了diff算法。计算出哪里需要更新才去更新对应的watcher




