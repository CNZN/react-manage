import React from "react"
import {
    DesktopOutlined,
    PieChartOutlined,
    EditFilled,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
const menulist = [
    {
        title: '首页', // 菜单标题名称
        path_name: '/main/home', // 对应的path
        icon: <DesktopOutlined />, // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '用户', // 菜单标题名称
        path_name: '/main/users', // 对应的path
        icon: <PieChartOutlined />, // 图标名称
    },
    {
        title: '图表', // 菜单标题名称
        path_name: '/main/charts', // 对应的path
        icon: <UserOutlined />, // 图标名称
        children: [
            {
                title: '饼状图', // 菜单标题名称
                path_name: '/main/charts/pie', // 对应的path
                icon: <PieChartOutlined />,
            },
            {
                title: '柱状图', // 菜单标题名称
                path_name: '/main/charts/bar', // 对应的path
                icon: <UserOutlined />,
            },
            {
                title: '花里胡哨图', // 菜单标题名称
                path_name: '/main/charts/crazy', // 对应的path
                icon: <PieChartOutlined />,
            }
        ]
    },
    {
        title: 'goods', // 菜单标题名称
        path_name: '/main/goods', // 对应的path
        icon: <PieChartOutlined />,
        children: [
            {
                title: 'team1', // 菜单标题名称
                path_name: '/main/goods/team1', // 对应的path
                icon: <TeamOutlined />,
            },
            {
                title: 'team2', // 菜单标题名称
                path_name: '/main/goods/team2', // 对应的path
                icon: <EditFilled />,
            }
        ]
    },
    {
        title: '用户管理', // 菜单标题名称
        path_name: '/main/usermanager', // 对应的path
        icon: <PieChartOutlined />, // 图标名称
    },
    {
        title: '角色管理', // 菜单标题名称
        path_name: '/main/rolemanager', // 对应的path
        icon: <PieChartOutlined />, // 图标名称
    }
]
export default menulist