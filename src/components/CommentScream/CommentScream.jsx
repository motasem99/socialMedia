import React, { useState, useEffect, Fragment } from 'react';
import { Modal } from 'antd';

import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { Alert } from 'antd';
import { Avatar } from 'antd';
import { Skeleton } from 'antd';

import moment from 'moment';

import { likeScream, disLikeScream } from '../../features/Scream/scream.js';

import { useHistory } from 'react-router';

import { HeartTwoTone, HeartFilled, CommentOutlined } from '@ant-design/icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addComment, selectCommentData } from '../../features/Scream/scream.js';
import { selectUser } from '../../features/user/userSlice.js';

const ContentForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
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
    .ant-modal-footer {
      display: none;
    }
  }
`;

const SubmitButton = styled(Button)``;

const CommentScream = ({
  visible,
  setVisible,
  screamId,
  userImage,
  userHandle,
  body,
  likeCount,
  commentCount,
  createdAt,
  credentials,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    comment: '',
  });
  const [error, setError] = useState();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const commentData = useSelector(selectCommentData);
  const [like, setLike] = useState(false);
  const itemLocalStorage = localStorage.getItem('token');
  const history = useHistory();
  const [activeLoading, setActiveLoading] = useState(true);

  useEffect(() => {
    if (
      credentials?.likes &&
      credentials?.likes.map((item) => item.screamId).includes(screamId)
    ) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [credentials?.likes, screamId]);

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
      setActiveLoading(true);
      dispatch(
        addComment(
          formData,
          user,
          setError,
          setConfirmLoading,
          setVisible,
          screamId
        )
      );
      setActiveLoading(false);
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
      <ModalContent visible={visible} onCancel={onFinishFailed}>
        <div style={{ display: 'flex' }}>
          <div>
            {' '}
            <Avatar size={190} src={userImage} />
          </div>
          <ContentPost>
            <ContentNameDelete>
              <NameLink href={`/userPage/?handle=${userHandle}`}>
                {userHandle}
              </NameLink>
            </ContentNameDelete>
            <ParaDate>{moment(createdAt).fromNow()}</ParaDate>
            <ParaPost>{body}</ParaPost>
            <ContentIcon>
              <Icons>
                <div>
                  {like ? (
                    <HeartFilledIcon onClick={() => handleLike(screamId)} />
                  ) : (
                    <HeartTwoToneIcon onClick={() => handleDisLike(screamId)} />
                  )}
                </div>
                <LikeAndComment> {likeCount} Like</LikeAndComment>{' '}
                <CommentOutlinedIcon />{' '}
                <LikeAndComment> {commentCount} comments</LikeAndComment>
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
          {!itemLocalStorage ? (
            ''
          ) : (
            <FormContent
              form={form}
              name='basic'
              layout='vertical'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label='Add You Comment'
                name='post'
                onChange={(e) => {
                  setFormData({ ...formData, comment: e.target.value });
                }}
                rules={[
                  { required: true, message: 'Please input your comment!' },
                ]}
              >
                <Input />
              </Form.Item>

              <div
                style={{
                  display: 'flex',
                  width: '35%',
                  justifyContent: 'space-between',
                }}
              >
                <Form.Item>
                  <SubmitButton
                    type='primary'
                    onClick={onFinish}
                    confirmLoading={confirmLoading}
                  >
                    add comment
                  </SubmitButton>
                </Form.Item>
              </div>
            </FormContent>
          )}
        </ContentForm>

        {!commentData.comments ? (
          <Skeleton active={activeLoading} />
        ) : (
          <Fragment>
            {commentData?.comments?.map((item) => {
              return (
                <div style={{ display: 'flex' }}>
                  <div>
                    {' '}
                    <Avatar size={120} src={item.userImage} />
                  </div>
                  <ContentPost>
                    <ContentNameDelete>
                      <NameLink href={`/userPage/?handle=${item.userHandle}`}>
                        {item.userHandle}
                      </NameLink>
                    </ContentNameDelete>
                    <ParaDate>{moment(item.createdAt).fromNow()}</ParaDate>
                    <ParaPost>{item.body}</ParaPost>
                  </ContentPost>
                </div>
              );
            })}
          </Fragment>
        )}
      </ModalContent>
    </Container>
  );
};

export default CommentScream;
