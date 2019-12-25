export default [
    {
        title:'首页',
        key:'/home',
        icon:'home'
    },
    {
        title:'会员管理',
        key:'/member/statistics',
        icon:'user'
    },
    {
        title:'自定义组件',
        key:'/component',
        icon:'appstore',
        children:[
            {
                title:'滑动图片轮播图',
                key:'/component/img',
                icon:'yuque'
            },
            {
                title:'商品展示',
                key:'/component/list',
                icon:'yuque'
            },
        ]
    },
    {
        title:'UI',
        key:'/ui',
        icon:'home',
        children:[
            {
                title:'按钮',
                key:'/ui/buttons',
            },
            {
                title:'弹框',
                key:'/ui/modals',
            },
            {
                title:'Loading',
                key:'/ui/loadings',
            },
            {
                title:'通知提醒',
                key:'/ui/notification',
            },
            {
                title:'全局Message',
                key:'/ui/messages',
            },
            {
                title:'Tab页签',
                key:'/ui/tabs',
            },
            {
                title:'图片画廊',
                key:'/ui/gallery',
            },
            {
                title:'轮播图',
                key:'/ui/carousel',
            }
        ]
    },
    {
        title:'表单',
        key:'/form',
        icon:'bars',
        children:[
            {
                title:'登录',
                key:'/form/login',
            },
            {
                title:'注册',
                key:'/form/reg',
            }
        ]
    },
    {
        title:'表格',
        key:'/table',
        icon:'table',
        children:[
            {
                title:'基础表格',
                key:'/table/basic',
            },
            {
                title:'高级表格',
                key:'/table/high',
            }
        ]
    },
    {
        title:'富文本',
        key:'/rich',
        icon:'container'
    },
    {
        title:'图标',
        key:'/charts',
        icon:'layout',
        children:[
            {
                title:'柱形图',
                key:'/charts/bar'
            },
            {
                title:'饼图',
                key:'/charts/pie'
            },
            {
                title:'折线图',
                key:'/charts/line'
            },
        ]
    },
    {
        title:'权限设置',
        key:'/permission',
        icon:'coffee'
    },
];