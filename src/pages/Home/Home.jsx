import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Avatar } from 'antd';
import Logo from '../../image/logoSocialMedia.png';
import {
  HeartTwoTone,
  HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  ExpandAltOutlined,
} from '@ant-design/icons';

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

const DeleteOutlinedIcon = styled(DeleteOutlined)`
  font-size: 2rem;
  color: red;
  cursor: pointer;
  padding: 0.4rem;
`;

const ExpandAltOutlinedIcon = styled(ExpandAltOutlined)`
  font-size: 1.8rem;
  color: #1890ff;
  cursor: pointer;
`;

const SideProfile = styled.div`
  width: 35%;
  padding: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const ContentProfile = styled.div`
  width: 70%;
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

const Home = () => {
  const [like, setLike] = useState(false);
  const [profileUser, setProfileUser] = useState(false);

  const handleDislike = () => {
    setLike(false);
  };

  const handleLike = () => {
    setLike(true);
  };

  return (
    <Container>
      <SideContent>
        <CardPost>
          <ContentAvatar>
            <Avatar shape='square' size={190} src={Logo} />
          </ContentAvatar>
          <ContentPost>
            <ContentNameDelete>
              <NameLink href='#'>name</NameLink>
              <DeleteOutlinedIcon />
            </ContentNameDelete>
            <ParaDate>The date</ParaDate>
            <ParaPost>the description post</ParaPost>
            <ContentIcon>
              <Icons>
                {like ? (
                  <HeartFilledIcon onClick={handleDislike} />
                ) : (
                  <HeartTwoToneIcon onClick={handleLike} />
                )}
                <LikeAndComment> 5 Like</LikeAndComment> <CommentOutlinedIcon />{' '}
                <LikeAndComment> 8 comments</LikeAndComment>
              </Icons>
              <div>
                <ExpandAltOutlinedIcon />
              </div>
            </ContentIcon>
          </ContentPost>
        </CardPost>
      </SideContent>

      {profileUser ? (
        <SideLogin>
          <ContentSideLogin>
            <Para>No profile found, please login again</Para>
            <ContentButtons>
              <Button type='primary'>Login</Button>
              <Button type='primary' danger>
                Signup
              </Button>
            </ContentButtons>
          </ContentSideLogin>
        </SideLogin>
      ) : (
        <SideProfile>
          <ContentProfile>
            <ContentAvatarProfile>
              <Avatar size={210} />
            </ContentAvatarProfile>

            <ContentUserName>
              <LinkUserName href='#'>@test</LinkUserName>
            </ContentUserName>
          </ContentProfile>
        </SideProfile>
      )}
    </Container>
  );
};

export default Home;
