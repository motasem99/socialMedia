import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Avatar } from 'antd';
import Logo from '../../image/logoSocialMedia.png';

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

const ContentButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 65%;
  margin: 0 auto;
`;

const Para = styled.p`
  font-size: 1.2rem;
`;

const CardPost = styled.div`
  border: 1px solid;
  width: 80%;
  margin: 2rem auto;
  height: 170px;
  display: flex;
`;

const ContentAvatar = styled.div`
  width: 23%;
`;

const ContentPost = styled.div``;

const Home = () => {
  return (
    <Container>
      <SideContent>
        <CardPost>
          <ContentAvatar>
            {' '}
            <Avatar
              shape='square'
              size={64}
              src={Logo}
              style={{ width: '100%', height: '100%' }}
            />
          </ContentAvatar>
          <ContentPost>content</ContentPost>
        </CardPost>
      </SideContent>

      <SideLogin>
        <div>
          <Para>No profile found, please login again</Para>
          <ContentButtons>
            <Button type='primary'>Login</Button>
            <Button type='primary' danger>
              Signup
            </Button>
          </ContentButtons>
        </div>
      </SideLogin>
    </Container>
  );
};

export default Home;
