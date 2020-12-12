import React, { useEffect, useState } from "react"
import { Card, Table, Space, Popconfirm, Button, message } from 'antd';
import AddClassify from "./addclassify";
import UpdateClassify from "./updateclassify";
// 获取分类
import { toGetClassify, toDelClassify } from "../api";
function Team1() {
    // 查询一二级id用的pid
    const [parentId, setparentId] = useState('0')
    // 
    const [parentsName, setParentsName] = useState('')
    // 表格循环的数据
    const [dataSource, setDatasource] = useState([]);
    // 工具代码 用来驱动第一次刷新
    const [tool, setTool] = useState(true)

    useEffect(() => {
        // 获取列表
        toGetClassify(0).then((res) => {
            var bb = res.data.data
            for (var i = 0; i < bb.length; i++) {
                bb[i].key = +i + +1
            }
            // 将第一次获取的以及列表渲染
            setDatasource(bb)
        })
    }, [tool])
    // 点击去子分类 带上该一级分类的信息
    const toNextClassify = (parentId_id) => {
        // console.log(parentId_id._id)
        // 用父类的id去拿其下面的子分类
        setparentId(parentId_id._id)
        // 拿到当前正在去的子分类的主分类的类名
        setParentsName(parentId_id.name)
        // 拿
        toGetClassify(parentId_id._id).then((res) => {
            var bb = res.data.data
            for (var i = 0; i < bb.length; i++) {
                bb[i].key = +i + +1
            }
            // 重新取值
            setDatasource(bb)
            // console.log(dataSource)
        })
    }
    const columns = [
        {
            title: '类名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'name',
            render: (text, record) => (
                <Space size="middle">
                    <UpdateClassify />
                    {parentId === "0" ? (
                        <Button onClick={() => toNextClassify(record)}>查看子分类</Button>
                    ) : null
                    }
                    <Popconfirm
                        title="你确定要删除吗?"
                        onConfirm={() => confirm(record._id)}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    function confirm(_id) {
        toDelClassify(_id).then(res => {
        })
        message.success('删除成功');
    }

    function cancel(e) {
        message.error('取消删除');
    }
    // 点击回到一级分类
    const toParentClsaaify = () => {
        setTool(!tool)
        toGetClassify(0).then((res) => {
            var bb = res.data.data
            for (var i = 0; i < bb.length; i++) {
                bb[i].key = +i + +1
            }
            setDatasource(bb)
            setparentId('0')
            // setparentId(0)
            // console.log(parentId)
        })
        setParentsName('')
    }
    return (
        <Card
            title={<div><span onClick={toParentClsaaify}>商品分类</span>  {(parentsName !== 0 ? "->" + parentsName : '')}</div>}
            extra={<AddClassify parentId={parentId} parentsName={parentsName} />}
            style={{ width: '100%', marginTop: '50px' }}>

            <Table
                dataSource={dataSource}
                pagination={{ pageSize: 5, showSizeChanger: true, showQuickJumper: true }}
                columns={columns}
            />
        </Card>
    )
}
export default Team1