import React, { useEffect, Fragment, useState } from 'react';
import * as qs from 'query-string';
import styled from 'styled-components';
import { Avatar } from 'antd';
import moment from 'moment';
import { Skeleton } from 'antd';

import {
  HeartTwoTone,
  HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  ExpandAltOutlined,
  EnvironmentOutlined,
  AliyunOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserPage,
  selectUserDataPage,
} from '../../features/user/userSlice.js';

const SideContent = styled.div`
  width: 65%;
  margin: 0 auto;
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
  cursor: default;
}`;

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

const CalendarOutlinedIcon = styled(CalendarOutlined)`
  font-size: 1.5rem;
  color: #1890ff;
  cursor: pointer;
  margin-right: 1rem;
`;

const UserPage = () => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const dataUserPage = useSelector(selectUserDataPage);
  const [activeLoading, setActiveLoading] = useState(true);

  useEffect(() => {
    setActiveLoading(true);
    const parsed = qs.parse(window.location.search);
    dispatch(getUserPage(parsed.handle));
    setActiveLoading(false);
  }, []);

  const handleDislike = () => {
    setLike(false);
  };

  const handleLike = () => {
    setLike(true);
  };

  return (
    <Fragment>
      <div style={{ display: 'flex' }}>
        {dataUserPage.screams ? (
          <Fragment>
            {dataUserPage.screams.length === 0 ? (
              <div style={{ width: '65%' }}>
                <h1>No Post Here</h1>
              </div>
            ) : (
              <SideContent>
                {dataUserPage.screams?.map((item) => {
                  return (
                    <CardPost>
                      <ContentAvatar>
                        <Avatar
                          shape='square'
                          size={190}
                          src={item.userImage}
                        />
                      </ContentAvatar>
                      <ContentPost>
                        <ContentNameDelete>
                          <NameLink href={`/userPage/?handle=`}>
                            {item.userHandle}
                          </NameLink>
                          <DeleteOutlinedIcon />
                        </ContentNameDelete>
                        <ParaDate>
                          {moment(item.createdAt).format('MMM YYYY')}
                        </ParaDate>
                        <ParaPost>{item.body}</ParaPost>
                        <ContentIcon>
                          <Icons>
                            {like ? (
                              <HeartFilledIcon onClick={handleDislike} />
                            ) : (
                              <HeartTwoToneIcon onClick={handleLike} />
                            )}
                            <LikeAndComment>
                              {' '}
                              {item.likeCount} Like
                            </LikeAndComment>{' '}
                            <CommentOutlinedIcon />{' '}
                            <LikeAndComment>
                              {' '}
                              {item.commentCount} comments
                            </LikeAndComment>
                          </Icons>
                          <div>
                            <ExpandAltOutlinedIcon />
                          </div>
                        </ContentIcon>
                      </ContentPost>
                    </CardPost>
                  );
                })}
              </SideContent>
            )}
          </Fragment>
        ) : (
          <Skeleton active={activeLoading} />
        )}

        <SideProfile>
          {!dataUserPage.user ? (
            <Skeleton active={activeLoading} />
          ) : (
            <ContentProfile>
              <Fragment>
                <ContentAvatarProfile>
                  <input
                    type='file'
                    accept='image/*'
                    name='userImage'
                    id='userImage'
                    style={{ display: 'none' }}
                  />
                  <Avatar size={210} src={dataUserPage.user.imageUrl} />
                </ContentAvatarProfile>

                <ContentUserName>
                  <LinkUserName href='#'>
                    @{dataUserPage.user.handle}
                  </LinkUserName>
                </ContentUserName>
                <Profile>
                  <ContentProfileStyle>
                    {dataUserPage.user.bio}
                  </ContentProfileStyle>
                  <ContentProfileStyle>
                    <EnvironmentOutlinedIcon /> {dataUserPage.user.location}
                  </ContentProfileStyle>
                  <ContentProfileStyle>
                    <UserSite href='#' target='_blank'>
                      <AliyunOutlinedIcon /> {dataUserPage.user.website}
                    </UserSite>
                  </ContentProfileStyle>
                </Profile>
                <ContentProfileStyle>
                  <CalendarOutlinedIcon />
                  {moment(dataUserPage.user.createdAt).format('MMM YYYY')}
                </ContentProfileStyle>
              </Fragment>
            </ContentProfile>
          )}
        </SideProfile>
      </div>
    </Fragment>
  );
};

export default UserPage;
