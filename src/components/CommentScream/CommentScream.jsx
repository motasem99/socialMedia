import React, { useState } from 'react';
import { Modal } from 'antd';

import styled from 'styled-components';
import { Form, Input } from 'antd';
import { Alert } from 'antd';
import { Avatar } from 'antd';

import { likeScream, disLikeScream } from '../../features/Scream/scream.js';

import { useHistory } from 'react-router';

import { HeartTwoTone, HeartFilled, CommentOutlined } from '@ant-design/icons';

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

const ContentPost = styled.div`
  padding: 1rem;
  width: 77%;
`;

const ContentNameDelete = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameLink = styled.a`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const ParaDate = styled.p`
  margin-left: 1rem;
  margin-bottom: 0;
  padding: 0.5rem 0;
`;

const ParaPost = styled.p`
  margin-left: 1rem;
  margin-bottom: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ContentIcon = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-left: 1rem;
  align-items: end;
`;

const Icons = styled.div`
  display: flex;
`;

const HeartTwoToneIcon = styled(HeartTwoTone)`
  font-size: 1.7rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const HeartFilledIcon = styled(HeartFilled)`
  font-size: 1.7rem;
  color: #1890ff;
  margin-right: 1rem;
  cursor: pointer;
`;

const CommentOutlinedIcon = styled(CommentOutlined)`
  font-size: 2rem;
  color: #1890ff;
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const LikeAndComment = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
`;

const Container = styled.div``;

const ModalContent = styled(Modal)`
  .ant-modal-content {
    width: 600px;
  }
`;

const CommentScream = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    post: '',
  });
  const [error, setError] = useState();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [like, setLike] = useState(false);
  const itemLocalStorage = localStorage.getItem('token');
  const history = useHistory();

  const handleLike = (screamId) => {
    if (!itemLocalStorage) {
      history.push('/login');
    }
    dispatch(likeScream(itemLocalStorage, setLike, like, screamId));
  };

  const handleDisLike = (screamId) => {
    if (!itemLocalStorage) {
      history.push('/login');
    }
    dispatch(disLikeScream(itemLocalStorage, setLike, like, screamId));
  };

  const onFinish = (e) => {
    try {
      form.submit();
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
    <Container>
      <ModalContent
        visible={visible}
        onOk={onFinish}
        confirmLoading={confirmLoading}
        onCancel={onFinishFailed}
      >
        <div style={{ display: 'flex' }}>
          <div>
            {' '}
            <Avatar size={190} />
          </div>
          <ContentPost>
            <ContentNameDelete>
              <NameLink href={`/userPage`}>asdasd</NameLink>
            </ContentNameDelete>
            <ParaDate>asdasd</ParaDate>
            <ParaPost>asdasd</ParaPost>
            <ContentIcon>
              <Icons>
                <div>
                  {like ? (
                    <HeartFilledIcon onClick={() => handleLike()} />
                  ) : (
                    <HeartTwoToneIcon onClick={() => handleDisLike()} />
                  )}
                </div>
                <LikeAndComment> 3 Like</LikeAndComment> <CommentOutlinedIcon />{' '}
                <LikeAndComment> 4 comments</LikeAndComment>
              </Icons>
            </ContentIcon>
          </ContentPost>
        </div>

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
      </ModalContent>
    </Container>
  );
};

export default CommentScream;
