import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
function UpdateClassify() {
    const [state, setState] = useState({ visible: false })
    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')
    const showModal = () => {
        setState({
            visible: true,
        });
    };

    const handleOk = e => {
        console.log(val1, val2)
        console.log(e);
        setState({
            visible: false,
        });
    };

    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                修改
            </Button>
            <Modal
                title="Basic Modal"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* 判断是否为一级还是二级修改 */}
                所属一级分类
                <Input value={val1} onChange={(e) => { setVal1(e.target.value) }} />
                所属二级分类
                <Input value={val2} onChange={(e) => { setVal2(e.target.value) }} />
            </Modal>
        </>
    )
}
export default UpdateClassify