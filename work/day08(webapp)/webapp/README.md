### json的规范
    ECMA404规范;(http://www.ecma-international.org/);
    ECMA404规范定义了josn是一个类似于js对象的字符串:
        所有的key必须使用双引号进行包裹
        所有对象的最后一个键值对不能加逗号
        josn文件中是不可以添加注释的

### 项目的初始化
    1. 使用@vue/cli创建项目
            vue -V
            vue create webapp
            npm run serve
    2. 添加vue.config.js配置文件,对脚手架的环境进行一些配置
            module.exports={
                lintOnSave:false,
                devServer:{
                    open:true
                }
            }
    3. 安装哈士奇 & git操作
            npm i husky -D
            定义git的钩子: 修改package.json文件
                "husky":{
                    "hooks":{
                      "pre-commit":"npm run lint"
                    }
                }
            git 最基本的操作
                git status
                git add ./
                git commit -m "xx"
                git push
    4. 搭建vue的生态圈
        mock & axios
            静态mock:
                const {seller,goods,ratings} = require("./data/data.json")
                module.exports={
                    lintOnSave:false,
                    devServer:{
                        open:true,
                        before: function(app) {
                            //app 就是我们express的核心对象  可以用来注册一个后台路由
                            app.get('/api/seller', function(req, res) {
                                res.json({seller});
                            });
                            app.get('/api/goods', function(req, res) {
                                res.json({goods});
                            });
                            app.get('/api/ratings', function(req, res) {
                                res.json({ratings});
                            });
                        }
                    }
                }
            axios
                npm i axios -s
                在app.vue中进行测试
                    async mounted(){
                        const seller = await axios.get("/api/seller");
                        console.log(seller)
                    }
        vue-router
            安装包:npm i vue-router -s
            定义路由: 路径与vue组件的映射关系
            定义路由器 :初始化一个路由器对象
            将路由交给路由器管理
            将路由器交给vue管理
            将vue-router注册为vue的插件(会在router.js中进行)
            为命中的路由选取一个渲染的位置
        vuex
