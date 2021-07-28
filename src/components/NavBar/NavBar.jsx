import React, { Fragment, useEffect } from 'react';
import { Button } from 'antd';
import { BellOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  setUser,
  readNotification,
  selectNotifications,
  selectCountNotifications,
  selectUnReadNotifications,
} from '../../features/user/userSlice';

import styled from 'styled-components';

import AddPost from '../../components/AddPost/AddPost';

import { Menu } from 'antd';
import { Dropdown } from 'antd';
import { Badge } from 'antd';

import { HeartFilled, CommentOutlined } from '@ant-design/icons';
import moment from 'moment';

const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #00bcd4;
  color: white;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const ContainerUserExists = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PlusOutlinedIcon = styled(PlusOutlined)`
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  color: white;
`;

const HomeOutlinedIcon = styled(HomeOutlined)`
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  color: white;
`;

const BellOutlinedIcon = styled(BellOutlined)`
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  color: white;
`;

const LoginButton = styled(Button)`
  color: white;
  font-size: 1rem;
  font-weight: 500;
`;

const SignupButton = styled(Button)`
  color: white;
  font-size: 1rem;
  font-weight: 500;
`;

const HeartFilledIcon = styled(HeartFilled)`
  font-size: 1.7rem;
  color: #1890ff;
  cursor: pointer;
  margin-right: 0.8rem;
`;

const CommentOutlinedIcon = styled(CommentOutlined)`
  font-size: 2rem;
  color: #1890ff;
  cursor: pointer;
  margin-right: 0.8rem;
`;

const ContentComment = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const HeartFilledIconNotRead = styled(HeartFilled)`
  font-size: 1.7rem;
  color: red;
  cursor: pointer;
  margin-right: 0.8rem;
`;

const CommentOutlinedIconNotRead = styled(CommentOutlined)`
  font-size: 2rem;
  color: red;
  cursor: pointer;
  margin-right: 0.8rem;
`;

const NavBar = () => {
  let history = useHistory();
  const itemLocalStorage = localStorage.getItem('token');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const countNotifications = useSelector(selectCountNotifications);
  const unReadNot = useSelector(selectUnReadNotifications);
  const notification = useSelector(selectNotifications);

  console.log(notification);

  // const handleClickMenu = (e) => {
  //   console.log('click ', e);
  // };

  const showModal = () => {
    setVisible(true);
  };

  const handleClick = () => {
    history.push('/');
  };

  useEffect(() => {
    if (itemLocalStorage) {
      dispatch(setUser(itemLocalStorage));
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch, itemLocalStorage, unReadNot]);

  const menu = (
    <Menu>
      {notification.map((item) => {
        return (
          <Menu.Item key='0'>
            {item.read ? (
              <ContentComment>
                {item.type === 'comment' ? (
                  <Fragment>
                    <CommentOutlinedIcon /> {item.sender} {item.type} your
                    scream{'  '}
                    {moment(item.createdAt).fromNow()}
                  </Fragment>
                ) : (
                  <Fragment>
                    <HeartFilledIcon /> {item.sender} {item.type} your scream
                    {'  '}
                    {moment(item.createdAt).fromNow()}
                  </Fragment>
                )}
              </ContentComment>
            ) : (
              <ContentComment>
                {item.type === 'comment' ? (
                  <Fragment>
                    <CommentOutlinedIconNotRead /> {item.sender} {item.type}{' '}
                    your scream{'  '}
                    {moment(item.createdAt).fromNow()}
                  </Fragment>
                ) : (
                  <Fragment>
                    <HeartFilledIconNotRead /> {item.sender} {item.type} your
                    scream
                    {'  '}
                    {moment(item.createdAt).fromNow()}
                  </Fragment>
                )}
              </ContentComment>
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Container>
      {user ? (
        <ContainerUserExists>
          <PlusOutlinedIcon onClick={showModal} />
          <HomeOutlinedIcon onClick={handleClick} />
          <Badge count={countNotifications}>
            <Dropdown overlay={menu} trigger={['click']}>
              <BellOutlinedIcon
                className='ant-dropdown-link'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(readNotification(itemLocalStorage, unReadNot));
                }}
              />
            </Dropdown>
          </Badge>

          <AddPost visible={visible} setVisible={setVisible} />
        </ContainerUserExists>
      ) : (
        <ContainerUserExists>
          <LoginButton type='text' href='/login'>
            Login
          </LoginButton>
          <HomeOutlinedIcon onClick={handleClick} />
          <SignupButton type='text' href='/signup'>
            Sign up
          </SignupButton>
        </ContainerUserExists>
      )}
    </Container>
  );
};

export default NavBar;
