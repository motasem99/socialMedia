import React from 'react';

import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import Logo from '../../image/logoSocialMedia.png';

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

const FormContent = styled(Form)`
  justify-content: center;
  display: flex;
  flex-direction: column;
  .ant-form-item-control {
    max-width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  width: 35%;
`;

const HaveAccount = styled.div`
  padding: 1rem;
`;

const ParaHaveAccount = styled.p``;

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (e) => {
    console.log('Success:', e);
    e.email = '';
    e.password = '';
    e.confirmPassword = '';
    e.userHandle = '';
  };

  const onFinishFailed = (e) => {
    console.log('Failed:', e);
  };

  return (
    <Container>
      <InfoContent>
        <ContentLogo>
          <Img src={Logo} alt='logo' />
        </ContentLogo>
        <ContentHeader>
          <H2>Login</H2>
        </ContentHeader>
      </InfoContent>
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
            label='email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <SubmitButton type='primary' onClick={() => form.submit()}>
              Submit
            </SubmitButton>
          </Form.Item>
        </FormContent>
        <HaveAccount>
          <ParaHaveAccount>
            Do not Have account? click <a href='/signup'>here</a>
          </ParaHaveAccount>
        </HaveAccount>
      </ContentForm>
    </Container>
  );
};

export default Login;
