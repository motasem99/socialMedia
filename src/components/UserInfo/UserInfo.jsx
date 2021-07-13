import React from 'react';
import { Modal } from 'antd';

const UserInfo = ({ visible, confirmLoading, handleOk, handleCancel }) => {
  return (
    <div>
      <Modal
        title='Title'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>modalText</p>
      </Modal>
    </div>
  );
};

export default UserInfo;
