import React, { useState } from 'react';

import logo from '../../image/logoSocialMedia.png';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Alert } from 'antd';

import { useHistory } from 'react-router';

// redux
import { useDispatch } from 'react-redux';
import { signup } from '../../features/user/userSlice.js';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoContent = styled.div`
  width: 50%;
  margin: 0 auto;
  display: grid;
  justify-content: center;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;

const H2 = styled.h2`
  font-size: 4rem;
  font-weight: 200;
`;

const ContentLogo = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 35%;
`;

const SubmitButton = styled(Button)`
  width: 35%;
`;

const HaveAccount = styled.div`
  padding: 1rem;
`;

const ParaHaveAccount = styled.p``;

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

const Signup = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userHandle: '',
  });
  const [error, setError] = useState();
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const history = useHistory();

  const onFinish = (e) => {
    try {
      dispatch(signup(formData, setError, setSpinnerLoading));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (e) => {
    console.log('Failed:', e);
  };

  const token = localStorage.getItem('token');
  if (token) {
    history.push('/');
  }

  return (
    <Container>
      <InfoContent>
        <ContentLogo>
          <Img src={logo} alt='logo' />
        </ContentLogo>
        <ContentHeader>
          <H2>Sign up</H2>
        </ContentHeader>
      </InfoContent>
      {error && (
        <AlertError message='Error' description={error} type='error' showIcon />
      )}
      <ContentForm>
        <FormContent
          form={form}
          name='basic'
          layout='vertical'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Email'
            name='email'
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Confirm Password'
            name='confirmPassword'
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
            rules={[
              { required: true, message: 'Please input your confirmPassword!' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='User Handle'
            name='userHandle'
            onChange={(e) => {
              setFormData({ ...formData, userHandle: e.target.value });
            }}
            rules={[
              { required: true, message: 'Please input your userHandle!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <SubmitButton
              type='primary'
              onClick={() => form.submit()}
              loading={spinnerLoading}
            >
              Submit
            </SubmitButton>
          </Form.Item>
        </FormContent>
        <HaveAccount>
          <ParaHaveAccount>
            Have account? click <a href='/login'>here</a>
          </ParaHaveAccount>
        </HaveAccount>
      </ContentForm>
    </Container>
  );
};

export default Signup;
