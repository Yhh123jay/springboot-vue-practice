# 项目介绍

B站springboot和Vue前后端分离项目，学生管理系统

# 开发环境

1、springboot2.7.0

2、Vue3

3、maven3.6.3

4、mysql6

5、element plus

# 遇到问题汇总

1、用ref封装的数据需要用value取到

```js
let isCollapse = ref(false);
  let sideWidth = ref(200);
  let logoTextShow = ref(true);
  let iconName = shallowRef(Fold);
```

2、mapper.xml文件扫描配置

```yaml
mybatis:
  mapper-locations: classpath:mapper/*.xml #扫描所有mybatis的所有xml文件
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

3、前后端跨域问题解决

![image-20230331110531765](README.assets/image-20230331110531765-16802319499281.png)

解决方法：https://blog.csdn.net/qq_39390545/article/details/106615075

4、忽略某个字段，不展示给前端

```java
//不展示密码
@JsonIgnore
private String password;
```

5、vue3实现数组响应式

```js
let tableData = ref([])
```

