import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Avatar } from 'antd';
import { Skeleton } from 'antd';
import moment from 'moment';

import { useHistory } from 'react-router-dom';

import {
  EnvironmentOutlined,
  AliyunOutlined,
  EditOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  setUser,
  uploadUserPhoto,
  getUserProfile,
  selectUserData,
} from '../../features/user/userSlice';

import { getScreams, selectScreams } from '../../features/Scream/scream.js';

import ScreamCard from '../../components/ScreamCard/ScreamCard';

import UserInfo from '../../components/UserInfo/UserInfo';

const Container = styled.div`
  display: flex;
`;

const SideContent = styled.div`
  width: 65%;
  margin: 0 auto;
`;

const SideLogin = styled.div`
  width: 35%;
  padding: 1rem;
  display: grid;
  margin-top: 2rem;
  justify-content: center;
`;

const ContentSideLogin = styled.div`
  width: 100%;
  height: 160px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  padding: 2rem;
`;

const ContentButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 65%;
  margin: 0 auto;
`;

const Para = styled.p`
  font-size: 1.2rem;
`;

const SideProfile = styled.div`
  width: 35%;
  padding: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const ContentProfile = styled.div`
  width: 60%;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const ContentAvatarProfile = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const ContentUserName = styled.div`
  text-align: center;
  width: 100%;
`;

const LinkUserName = styled.a`
  font-size: 2.2rem;
`;

const Profile = styled.div`
  text-align: center;
`;

const EnvironmentOutlinedIcon = styled(EnvironmentOutlined)`
  font-size: 1.5rem;
  color: #1890ff;
  margin: 0 0.8rem;
  padding: 0.3rem 0;
`;

const AliyunOutlinedIcon = styled(AliyunOutlined)`
  font-size: 1.5rem;
  color: #1890ff;
  margin: 0 0.8rem;
  padding: 0.3rem 0;
`;

const UserSite = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const ContentProfileStyle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0px;
  padding: 0.3rem 0px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LogoutAndData = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
}
`;

const EditOutlinedIcon = styled(EditOutlined)`
  font-size: 2rem;
  color: #1890ff;
  cursor: pointer;
  margin-right: 1rem;
`;

const LogoutOutlinedIcon = styled(LogoutOutlined)`
  font-size: 2rem;
  color: #1890ff;
  cursor: pointer;
  margin-left: 1rem;
`;

const CalendarOutlinedIcon = styled(CalendarOutlined)`
  font-size: 1.5rem;
  color: #1890ff;
  cursor: pointer;
  margin-right: 1rem;
`;

const ContentEditUserPhoto = styled.div`
  position: absolute;
  top: 30%;
  left: 80%;
`;

const Home = () => {
  const itemLocalStorage = localStorage.getItem('token');
  const user = useSelector(selectUser);
  const screams = useSelector(selectScreams);
  const credentials = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [activeLoading, setActiveLoading] = useState(true);
  const history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  const handleChange = (e) => {
    try {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      dispatch(uploadUserPhoto(formData, user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setActiveLoading(true);
    dispatch(getScreams());
    setActiveLoading(false);
    if (itemLocalStorage) {
      dispatch(getUserProfile(itemLocalStorage));
      dispatch(setUser(itemLocalStorage));
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch, itemLocalStorage]);

  return (
    <Container>
      <SideContent>
        {screams?.map((item) => {
          return (
            <ScreamCard
              key={item.screamId}
              credentials={credentials}
              user={user}
              screamId={item.screamId}
              userImage={item.userImage}
              userHandle={item.userHandle}
              body={item.body}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
              createdAt={item.createdAt}
            />
          );
        })}
      </SideContent>

      {user ? (
        <SideProfile>
          <ContentProfile>
            {!credentials?.credentials ? (
              <Skeleton active={activeLoading} />
            ) : (
              <Fragment>
                <ContentAvatarProfile>
                  <input
                    type='file'
                    accept='image/*'
                    name='userImage'
                    id='userImage'
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                  <label htmlFor='userImage'>
                    <Avatar size={210} src={credentials.credentials.imageUrl} />
                    <ContentEditUserPhoto>
                      <EditOutlinedIcon />
                    </ContentEditUserPhoto>
                  </label>
                </ContentAvatarProfile>

                <ContentUserName>
                  <LinkUserName href='#'>
                    @{credentials.credentials?.handle}
                  </LinkUserName>
                </ContentUserName>
                <Profile>
                  {credentials.credentials.bio && (
                    <ContentProfileStyle>
                      {credentials.credentials?.bio}
                    </ContentProfileStyle>
                  )}
                  {credentials.credentials.location && (
                    <ContentProfileStyle>
                      <EnvironmentOutlinedIcon />{' '}
                      {credentials.credentials.location}
                    </ContentProfileStyle>
                  )}
                  {credentials.credentials.website && (
                    <ContentProfileStyle>
                      <UserSite
                        href={credentials.credentials?.website}
                        target='_blank'
                      >
                        <AliyunOutlinedIcon />{' '}
                        {credentials.credentials?.website}
                      </UserSite>
                    </ContentProfileStyle>
                  )}
                </Profile>
                <ContentProfileStyle>
                  <CalendarOutlinedIcon />
                  {credentials.credentials &&
                    moment(credentials.credentials?.createdAt).format(
                      'MMM YYYY'
                    )}
                </ContentProfileStyle>
                <LogoutAndData>
                  <LogoutOutlinedIcon
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch(setUser(null));
                    }}
                  />
                  <EditOutlinedIcon onClick={showModal} />
                </LogoutAndData>
              </Fragment>
            )}
          </ContentProfile>

          <UserInfo
            visible={visible}
            setVisible={setVisible}
            data={credentials?.credentials}
          />
        </SideProfile>
      ) : (
        <SideLogin>
          <ContentSideLogin>
            <Para>No profile found, please login again</Para>
            <ContentButtons>
              <Button
                type='primary'
                to='/login'
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </Button>
              <Button
                type='primary'
                danger
                onClick={() => {
                  history.push('/signup');
                }}
              >
                Signup
              </Button>
            </ContentButtons>
          </ContentSideLogin>
        </SideLogin>
      )}
    </Container>
  );
};

export default Home;
