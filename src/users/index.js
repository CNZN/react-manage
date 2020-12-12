import React, { Component } from "react"
import { Table, Switch, Radio, Form, Space, Button, Popconfirm, message } from 'antd';
import "./users.less"
import { toDel, toUser } from "../api/index"

const columns = [
    {
        title: '姓名',
        dataIndex: 'username',
    },
    {
        title: '密码',
        dataIndex: 'password',
    },
    {
        title: '注册时间',
        dataIndex: 'time',
    },
    {
        title: '头像',
        dataIndex: 'url',
        render: (text, record) =>
            <Space size="middle">
                <>
                    <img src={"http://localhost:8888/" + record.url} alt="111" />
                </>
            </Space>
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Popconfirm
                    title="你确定要删除吗?"
                    onConfirm={() => confirm(record._id)}
                    onCancel={cancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button>删除</Button>
                </Popconfirm>

                <Button>
                    编辑
                </Button>
            </Space>
        ),
    },
];
function confirm(_id) {
    console.log(_id);
    message.success('删除成功');
    toDel(_id).then(res => {
        console.log(res)
    })
}

function cancel(e) {
    message.error('取消删除');
}
const data = JSON.parse(localStorage.getItem('bb'));

const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const pagination = { position: 'bottom' };

class Users extends Component {
    UNSAFE_componentWillMount() {
        toUser().then(res => {
            var bb = res.data.list
            for (var i = 0; i < bb.length; i++) {
                bb[i].key = +i + +1
                bb[i].url = bb[i].url.replace(/^(\s|")+|(\s|")+$/g, '');
            }
            localStorage.setItem('bb', JSON.stringify(bb))
        })
    }
    state = {
        bordered: false,
        loading: false,
        pagination,
        size: 'default',
        expandable,
        title: undefined,
        showHeader,
        footer,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
    };

    handleToggle = prop => enable => {
        this.setState({ [prop]: enable });
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    handleTableLayoutChange = e => {
        this.setState({ tableLayout: e.target.value });
    };

    handleExpandChange = enable => {
        this.setState({ expandable: enable ? expandable : undefined });
    };

    handleEllipsisChange = enable => {
        this.setState({ ellipsis: enable });
    };

    handleTitleChange = enable => {
        this.setState({ title: enable ? title : undefined });
    };

    handleHeaderChange = enable => {
        this.setState({ showHeader: enable ? showHeader : false });
    };

    handleFooterChange = enable => {
        this.setState({ footer: enable ? footer : undefined });
    };

    handleRowSelectionChange = enable => {
        this.setState({ rowSelection: enable ? {} : undefined });
    };

    handleYScrollChange = enable => {
        this.setState({ yScroll: enable });
    };

    handleXScrollChange = e => {
        this.setState({ xScroll: e.target.value });
    };

    handleDataChange = hasData => {
        this.setState({ hasData });
    };

    render() {
        const { xScroll, yScroll, ...state } = this.state;

        const scroll = {};
        if (yScroll) {
            scroll.y = 240;
        }
        if (xScroll) {
            scroll.x = '100vw';
        }

        const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
        if (xScroll === 'fixed') {
            tableColumns[0].fixed = true;
            tableColumns[tableColumns.length - 1].fixed = 'right';
        }

        return (
            <>
                <Form
                    layout="inline"
                    className="components-table-demo-control-bar"
                    style={{ marginBottom: 16 }}
                >
                    <Form.Item label="Bordered">
                        <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
                    </Form.Item>
                    <Form.Item label="loading">
                        <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
                    </Form.Item>
                    <Form.Item label="Title">
                        <Switch checked={!!state.title} onChange={this.handleTitleChange} />
                    </Form.Item>
                    <Form.Item label="Column Header">
                        <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
                    </Form.Item>
                    <Form.Item label="Footer">
                        <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
                    </Form.Item>
                    <Form.Item label="Expandable">
                        <Switch checked={!!state.expandable} onChange={this.handleExpandChange} />
                    </Form.Item>
                    <Form.Item label="Checkbox">
                        <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
                    </Form.Item>
                    <Form.Item label="Fixed Header">
                        <Switch checked={!!yScroll} onChange={this.handleYScrollChange} />
                    </Form.Item>
                    <Form.Item label="Has Data">
                        <Switch checked={!!state.hasData} onChange={this.handleDataChange} />
                    </Form.Item>
                    <Form.Item label="Ellipsis">
                        <Switch checked={!!state.ellipsis} onChange={this.handleEllipsisChange} />
                    </Form.Item>
                    <Form.Item label="Size">
                        <Radio.Group value={state.size} onChange={this.handleSizeChange}>
                            <Radio.Button value="default">Default</Radio.Button>
                            <Radio.Button value="middle">Middle</Radio.Button>
                            <Radio.Button value="small">Small</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Table Scroll">
                        <Radio.Group value={xScroll} onChange={this.handleXScrollChange}>
                            <Radio.Button value={undefined}>Unset</Radio.Button>
                            <Radio.Button value="scroll">Scroll</Radio.Button>
                            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Table Layout">
                        <Radio.Group value={state.tableLayout} onChange={this.handleTableLayoutChange}>
                            <Radio.Button value={undefined}>Unset</Radio.Button>
                            <Radio.Button value="fixed">Fixed</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Pagination Top">
                        <Radio.Group
                            value={this.state.top}
                            onChange={e => {
                                this.setState({ top: e.target.value });
                            }}
                        >
                            <Radio.Button value="topLeft">TopLeft</Radio.Button>
                            <Radio.Button value="topCenter">TopCenter</Radio.Button>
                            <Radio.Button value="topRight">TopRight</Radio.Button>
                            <Radio.Button value="none">None</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Pagination Bottom">
                        <Radio.Group
                            value={this.state.bottom}
                            onChange={e => {
                                this.setState({ bottom: e.target.value });
                            }}
                        >
                            <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
                            <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
                            <Radio.Button value="bottomRight">BottomRight</Radio.Button>
                            <Radio.Button value="none">None</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <Table
                    {...this.state}
                    pagination={{ position: [this.state.top, this.state.bottom], pageSize: 4 }}
                    columns={tableColumns}
                    dataSource={state.hasData ? data : null}
                    scroll={scroll}
                />
            </>
        );
    }
}
export default Users