import React, { useEffect } from 'react';
import * as qs from 'query-string';

// redux
import { useDispatch } from 'react-redux';
import { getUserPage } from '../../features/user/userSlice.js';

const UserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = qs.parse(window.location.search);
    dispatch(getUserPage(parsed.handle));
  }, []);

  return <div>userPage</div>;
};

export default UserPage;
