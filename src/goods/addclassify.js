import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { toAddClassify } from '../api';
function AddClassify(props) {
    const [state, setState] = useState({ visible: false })
    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')
    const showModal = () => {
        // console.log(props.parentsName)
        setState({
            visible: true,
        });
        setVal1(props.parentsName)
    };

    const handleOk = e => {
        // console.log(e);
        // console.log(val1, val2)
        // 添加对应一级别的类名
        toAddClassify(val1).then(res => {
            console.log(res)
        })
        // 添加对应er级别的类名
        toAddClassify(val2, props.parentId)
        setState({
            visible: false,
        });
        // 添加完后清空 可以适当写下逻辑 如添加成功情况 否者提示失败 并保留
        setVal2('')
    };

    const handleCancel = e => {
        // console.log(e);
        setState({
            visible: false,
        });
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                增加
            </Button>
            <Modal
                title="Basic Modal"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {
                    props.parentId === '0' ?
                        (<div><span>一级分类：</span>  <Input value={val1} onChange={(e) => { setVal1(e.target.value) }} /></div>) :
                        (<div><span>{props.parentsName}的二级分类：</span>  <Input value={val2} onChange={(e) => { setVal2(e.target.value) }} /></div>)
                }
                {/* {parentId === "0" ? (
                    <a onClick={() => toNextClassify(record)}>查看子分类</a>
                ) : null
                } */}

            </Modal>
        </>
    )
}
export default AddClassify