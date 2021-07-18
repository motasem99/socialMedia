import React, { useEffect } from 'react';
import { Button } from 'antd';
import { BellOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../features/user/userSlice';

import styled from 'styled-components';

import AddPost from '../../components/AddPost/AddPost';

import { Menu } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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

const NavBar = () => {
  let history = useHistory();
  const itemLocalStorage = localStorage.getItem('token');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const handleClickMenu = (e) => {
    console.log('click ', e);
  };

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
  }, [dispatch, itemLocalStorage]);

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <a href='#'>1st menu item</a>
      </Menu.Item>
      <Menu.Item key='1'>
        <a href='#'>2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <Container>
      {user ? (
        <ContainerUserExists>
          <PlusOutlinedIcon onClick={showModal} />
          <HomeOutlinedIcon onClick={handleClick} />
          <Dropdown overlay={menu} trigger={['click']}>
            <BellOutlinedIcon
              className='ant-dropdown-link'
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>

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
