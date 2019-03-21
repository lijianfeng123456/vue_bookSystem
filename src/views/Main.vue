<template>
<div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="this.userImg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{user}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：{{time}}</div>
                    <div class="user-info-list">上次登录的IP：{{ip}}</div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>图书种类比例</span><span style="float:right">More></span>
                    </div>
                    自然
                    <el-progress :percentage="60.3" color="#42b983"></el-progress>
                    科学
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    工程
                    <el-progress :percentage="3.7"></el-progress>
                    艺术
                    <el-progress :percentage="10.9" color="#f1e05a"></el-progress>
					地理
                    <el-progress :percentage="10.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">613</div>
                                    <div>会员访问总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">3</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">26</div>
                                    <div>图书总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover"><a href="#"style="float:right;text-decoration:none;">更多></a>
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                    
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover"><a href="#"style="float:right;text-decoration:none;">更多></a>
                    <schart ref="line" class="schart" canvasId="line" :data="data2" type="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {base}  from "../api/api";
  import Schart from 'vue-schart';
  import bus from "../common/js/bus.js" 
    export default {
        name: 'Main',
        data() {
            return {
                time:"",
                ip:"",
				user:"",//JSON.parse(sessionStorage.getItem('user')),//localStorage.getItem('sysUserName'),
                userImg:"",
                todoList: [{
                        title: '新增图书',
                        status: false,
                    },
                    {
                        title: '查看图书数量',
                        status: false,
                    },
                    {
                        title: '会员等级管理',
                        status: true,
                    }, {
                        title: '查看统计管理',
                        status: true,
                    },
                    {
                        title: '新增图书分类',
                        status: true,
                    },
                    {
                        title: '推送查看',
                        status: true,
                    }
                ],
                data: [{
                        name: '2019/09/04',
                        value: 100
                    },
                    {
                        name: '2018/09/05',
                        value: 60
                    },
                    {
                        name: '2018/09/06',
                        value: 80
                    },
                    {
                        name: '2018/09/07',
                        value: 82
                    },
                    {
                        name: '2018/09/08',
                        value: 120
                    },
                    {
                        name: '2018/09/09',
                        value: 100
                    },
                    {
                        name: '2018/09/10',
                        value: 165
                    }
                ],
                data2: [{
                        name: '2019/09/04',
                        value: 21
                    },
                    {
                        name: '2018/09/05',
                        value: 20
                    },
                    {
                        name: '2018/09/06',
                        value: 20
                    },
                    {
                        name: '2018/09/07',
                        value: 32
                    },
                    {
                        name: '2018/09/08',
                        value: 10
                    },
                    {
                        name: '2018/09/09',
                        value: 20
                    },
                    {
                        name: '2018/09/10',
                        value: 12
                    }
                ],
                options: {
                    title: '最近一周会员访问情况',
                    showValue: true,
                    fillColor: 'rgb(100, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近一周会员借阅情况',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
           Schart
        },
        computed: {
            role() {
                return this.user === 'admin' ? '超级管理员' : '普通管理员';
            }
        },
        created(){
            this.main();
            this.handleListener();
            this.changeDate();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
        
        main() {
         var qs = require("qs");
          var loginParams = {
            i: 1,
            n: 2
          };
           this.$axios.defaults.headers = {
             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
           };
           this.$axios.get(`${base}/ljf`,
              qs.stringify({ indices: false })
            )
            .then(response => {
             let data = response.data;
            console.log(data);
                                     
            });
             
        },
         
            changeDate(){
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
                })
            },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart(){
                this.$refs.bar.renderChart();
                this.$refs.line.renderChart();
            }
        },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.ip=user.mg_ip||"";
      this.time=user.mg_time ||"";
      this.user = user.mg_user || "";
      this.userImg = `${base}/img?url=user` || "";
    }
  }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(69, 143, 221);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(126, 255, 141);
    }

    .grid-con-2 .grid-num {
        color: rgb(116, 238, 146);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(228, 53, 82);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
