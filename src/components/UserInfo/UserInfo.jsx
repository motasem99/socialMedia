import React, { useState } from 'react';
import { Modal } from 'antd';

import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Alert } from 'antd';

const ContentForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  width: 35%;
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
  width: 35%;
  margin: 0 auto 1rem auto;
`;

const UserInfo = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    bio: '',
    website: '',
    location: '',
  });
  const [error, setError] = useState();
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const onFinish = (e) => {
    try {
      form.submit();
      //   setConfirmLoading(true);
      //   setVisible(false);
      //   setConfirmLoading(false);
      console.log(e);
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
        title='Edit Your Details'
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
              label='Bio'
              name='bio'
              onChange={(e) => {
                setFormData({ ...formData, bio: e.target.value });
              }}
              rules={[{ required: true, message: 'Please input your Bio!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Website'
              name='website'
              onChange={(e) => {
                setFormData({ ...formData, website: e.target.value });
              }}
              rules={[
                { required: true, message: 'Please input your Website!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Location'
              name='location'
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
              }}
              rules={[
                {
                  required: true,
                  message: 'Please input your Location!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </FormContent>
        </ContentForm>
      </Modal>
    </div>
  );
};

export default UserInfo;
