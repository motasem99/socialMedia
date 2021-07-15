import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import moment from 'moment';

import CommentScream from '../CommentScream/CommentScream.jsx';

import { useHistory } from 'react-router';

import { useDispatch } from 'react-redux';
import {
  deletePost,
  likeScream,
  disLikeScream,
} from '../../features/Scream/scream.js';

import {
  HeartTwoTone,
  HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  ExpandAltOutlined,
} from '@ant-design/icons';

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

const ScreamCard = ({
  screamId,
  userImage,
  userHandle,
  body,
  likeCount,
  commentCount,
  createdAt,
  credentials,
  user,
}) => {
  const dispatch = useDispatch();
  const itemLocalStorage = localStorage.getItem('token');
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [visible, setVisible] = React.useState(false);

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

  const showModal = () => {
    setVisible(true);
  };

  return (
    <CardPost key={screamId}>
      <ContentAvatar>
        <Avatar shape='square' size={190} src={userImage} />
      </ContentAvatar>
      <ContentPost>
        <ContentNameDelete>
          <NameLink href={`/userPage/?handle=${userHandle}`}>
            {userHandle}
          </NameLink>
          {credentials?.credentials?.handle === userHandle ? (
            <DeleteOutlinedIcon
              onClick={() => dispatch(deletePost(screamId, user))}
            />
          ) : (
            ''
          )}
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
          <div>
            <ExpandAltOutlinedIcon onClick={showModal} />
          </div>
        </ContentIcon>
        <CommentScream visible={visible} setVisible={setVisible} />
      </ContentPost>
    </CardPost>
  );
};

export default ScreamCard;
