import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Avatar } from 'antd';
import Logo from '../../image/logoSocialMedia.png';
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';

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
  width: 80%;
  margin: 3rem auto;
  height: 190px;
  display: flex;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const ContentAvatar = styled.div`
  width: 23%;
`;

const ContentPost = styled.div`
  padding: 1rem;
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

const HeartTwoToneIcon = styled(HeartTwoTone)`
  font-size: 1.7rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const HeartFilledIcon = styled(HeartFilled)`
  font-size: 1.7rem;
  color: #1890ff;
`;

const ContentIcon = styled.div`
  display: flex;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;

const Home = () => {
  const [like, setLike] = useState(false);

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
          <ContentPost>
            <NameLink href='#'>name</NameLink>
            <ParaDate>The date</ParaDate>
            <ParaPost>the description post</ParaPost>
            <ContentIcon>
              <p>Like:</p> {like ? <HeartFilledIcon /> : <HeartTwoToneIcon />}
              <p>comment:</p>{' '}
              {like ? <HeartFilledIcon /> : <HeartTwoToneIcon />}
            </ContentIcon>
          </ContentPost>
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
