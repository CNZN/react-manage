import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from "antd"
import menulist from "../config_menu/menulist"

const { SubMenu } = Menu;
function Navleft(props) {
    var openkey = ""
    const path = props.location.pathname
    const getMenuList = (menulist) => {

        return menulist.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.path_name} icon={item.icon}>
                        <NavLink to={item.path_name}> {item.title}</NavLink>
                    </Menu.Item>
                )
            } else {
                const flag = item.children.find((items) => items.path_name === path)
                if (flag) {
                    openkey = item.path_name
                }
                return (
                    <SubMenu key={item.path_name} title={item.title} icon={item.icon}>
                        {getMenuList(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    getMenuList(menulist)
    return (
        <>
            <Menu mode="inline" selectedKeys={[path]} defaultOpenKeys={[openkey]}>
                {getMenuList(menulist)}
            </Menu>
        </>
    )
}
export default withRouter(Navleft) 