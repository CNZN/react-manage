import React, { useState } from 'react';
import { Layout, Popconfirm, message, Button } from 'antd';
import "./main.less"
// import { toWeather } from "../api/index"
import { Route, useHistory, withRouter } from 'react-router-dom';
import Users from "../users/index"
import Home from '../components/Moren';
import Pie from '../echarts/Pie';
import Bar from '../echarts/Bar';
import Crazy from '../echarts/Crazy';
import Team1 from '../goods/Team1';
import Team2 from '../goods/Team2';
import UserManager from '../usermanager/usermanager';
import RoleManager from '../rolemanager/rolemanager';
import Navleft from '../components/Navleft';
const { Sider } = Layout;


function Main(props) {
    const history = useHistory()
    // var [imgurl, setImgurl] = useState('')
    // const path = props.location.pathname
    // if (path) {
    //     toWeather('北京').then(res => {
    //         var aa = res
    //         setImgurl(aa)
    //     })
    // }

    const [state, setS] = useState({ collapsed: false })
    const onCollapse = collapsed => {
        setS({ collapsed })
    };
    const confirm = (e) => {
        message.success('成功退出');
        localStorage.removeItem("user")
        history.push('/login')
    }
    const cancel = (e) => {
        message.error('停止退出');
    }
    return (
        <div>
            <Layout style={{ minHeight: '100vh', background: '#999999' }}>
                <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse} theme="light">
                    <div className="logo" />
                    <Navleft />
                </Sider>
                <Layout className="site-layout">

                    <div style={{ height: '50px', display: "flex", justifyContent: 'space-between', alignItem: 'center', lineHeight: "50px" }}>
                        {/* {
                            <span>{imgurl.weather}</span>
                        }
                        {
                            <img src={imgurl.dayPictureUrl} alt="Image" style={{ width: '30px', height: '20px' }} />
                        } */}

                        <Popconfirm
                            title="确定要退出吗?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="是"
                            cancelText="否"
                        >

                            <Button danger="true" style={{ width: "100px", float: "right", margin: "10px" }}>退出登录</Button>
                        </Popconfirm>
                    </div>
                    <Route path="/main/home" component={Home} />
                    <Route path="/main/users" component={Users} />
                    <Route path="/main/charts/pie" component={Pie} />
                    <Route path="/main/charts/bar" component={Bar} />
                    <Route path="/main/charts/crazy" component={Crazy} />
                    <Route path="/main/goods/team1" component={Team1} />
                    <Route path="/main/goods/team2" component={Team2} />
                    <Route path="/main/usermanager" component={UserManager} />
                    <Route path="/main/rolemanager" component={RoleManager} />
                </Layout>

            </Layout>
        </div>
    );

}
export default withRouter(Main) 