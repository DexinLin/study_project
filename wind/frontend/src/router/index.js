import Vue from 'vue'
import Router from 'vue-router'
// import Home from "../components/Home"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true,
            component: () => import('@/components/Login')
        },
        {
            hidden: true,
            path: '/login',
            component: () => import('@/components/Login')
        },
        {
            path: '/home',
            name: '学生管理',
            iconClass: 'fa fa-users',
            redirect: '/home/student',
            component: () => import('@/components/Home'), //路由懒加载
            // component: resolve => require(['@/components/Home'], resolve)  //路由异步加载
            children: [
                {
                    path: '/home/student',
                    name: '学生列表',
                    iconClass: 'fa fa-list',
                    component: () => import('@/components/students/StudentList'),
                },
                {
                    path: '/home/info',
                    name: '信息列表',
                    iconClass: 'fa fa-list-alt',
                    component: () => import('@/components/students/InfoList'),
                }
            ]
        },
        {
            path: '/analysis',
            name: '数据概览',
            iconClass: 'fa fa-bar-chart',
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/analysis/chart',
                    name: '数据分析',
                    iconClass: 'fa fa-signal',
                    component: () => import('@/components/dataAnalysis/Work1')
                },
                {
                    path: '/analysis/map',
                    name: '地图概览',
                    iconClass: 'fa fa-signal',
                    component: () => import('@/components/dataAnalysis/ChinaMap')
                },
                {
                    path: '/analysis/travel',
                    name: '旅游地图',
                    iconClass: 'fa fa-signal',
                    component: () => import('@/components/dataAnalysis/TravelMap')
                }
            ]
        },
        {
            path: '/demos',
            name: '测试模块',
            iconClass: 'fa fa-folder',
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/demos/one',
                    name: '测试案例',
                    iconClass: 'fa fa-coffee',
                    component: () => import('@/components/demos/Demo'),
                },
                {
                    path: '/demos/two',
                    name: '测试vuex',
                    iconClass: 'fa fa-coffee',
                    component: () => import('@/components/demos/Demo_store'),
                },
            ]
        },
        {
            path: '/users',
            name: '用户中心',
            iconClass: 'fa fa-user',
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/users/user',
                    name: '用户权限',
                    iconClass: 'fa fa-user',
                    component: () => import('@/components/users/User'),
                },
            ]
        },
        {
            path: '*',
            hidden: true,
            component: () => import('@/components/NotFound')
        }
    ],
    mode: 'history'
})