import React from "react"
import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

function Moren() {
    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0 }} />

            <Content style={{ margin: '0 16px' }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>

                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    默认页面
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}></Footer>
        </>
    )
}
export default Moren