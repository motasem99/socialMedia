import React, { useState } from 'react';
import { Modal } from 'antd';

import styled from 'styled-components';
import { Form, Input } from 'antd';
import { Alert } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addScreams } from '../../features/Scream/scream.js';
import { selectUser } from '../../features/user/userSlice.js';

const ContentForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

const FormContent = styled(Form)`
  justify-content: center;
  display: flex;
  flex-direction: column;
  .ant-form-item-control {
    max-width: 100%;
  }
`;

const AlertError = styled(Alert)`
  width: 100%;
  margin: 0 auto 1rem auto;
`;

const AddPost = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    post: '',
  });
  const [error, setError] = useState();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onFinish = (e) => {
    try {
      form.submit();
      //   dispatch(
      //     // EditUserProfile(formData, setError, setConfirmLoading, setVisible, user)
      //   );

      dispatch(
        addScreams(formData, user, setError, setConfirmLoading, setVisible)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (e) => {
    console.log('Failed:', e);
    setVisible(false);
  };

  return (
    <div>
      <Modal
        title='Add Post'
        visible={visible}
        onOk={onFinish}
        confirmLoading={confirmLoading}
        onCancel={onFinishFailed}
      >
        <ContentForm>
          {error && (
            <AlertError
              message='Error'
              description={error}
              type='error'
              showIcon
            />
          )}
          <FormContent
            form={form}
            name='basic'
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label='Add Your Post'
              name='post'
              onChange={(e) => {
                setFormData({ ...formData, post: e.target.value });
              }}
              rules={[{ required: true, message: 'Please input your Post!' }]}
            >
              <Input />
            </Form.Item>
          </FormContent>
        </ContentForm>
      </Modal>
    </div>
  );
};

export default AddPost;
