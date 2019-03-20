import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import bookType from './views/nav1/bookType.vue'
// import Form from './views/nav1/Form.vue'
import addBook from './views/nav1/addBook.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import level from './views/nav2/level.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
//import Router from 'vue-router'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '系统主页',
        iconCls: 'fa fa-home fa-lg',
        leaf: true,
        children: [{
            path: '/Main',
            component: Main,
            name: '系统主页'
        }]
    },
    {
        path: '/',
        component: Home,
        name: '图书管理',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            //{ path: '/main', component: Main, name: '主页', hidden: true },
            {
                path: '/bookType',
                component: bookType,
                name: '图书分类'
            },
            {
                path: '/addBook',
                component: addBook,
                name: '新增图书'
            },
            {
                path: '/user',
                component: user,
                name: '图书列表'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '会员管理',
        iconCls: 'fa fa-id-card-o',
        children: [{
                path: '/page4',
                component: Page4,
                name: '会员详情'
            },
            {
                path: '/page5',
                component: Page5,
                name: '等级详情'
            },
            {
                path: '/level',
                component: level,
                name: '等级详情'
            }

        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [{
            path: '/page6',
            component: Page6,
            name: '统计管理'
        }]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [{
            path: '/echarts',
            component: echarts,
            name: 'echarts'
        }]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;