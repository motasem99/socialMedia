import React from 'react';

import logo from '../../image/logoSocialMedia.png';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2rem;
`;

const InfoContent = styled.div`
  width: 50%;
  margin: 0 auto;
  display: grid;
  justify-content: center;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;

const H2 = styled.h2`
  font-size: 4rem;
  font-weight: 200;
`;

const Signup = () => {
  return (
    <Container>
      <InfoContent>
        <Img src={logo} alt='logo' />
        <H2>Sign up</H2>
      </InfoContent>
    </Container>
  );
};

export default Signup;
