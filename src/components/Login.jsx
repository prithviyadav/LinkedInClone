import styled from "styled-components";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import signInAPI from "../actions/index";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        <div>
          <Link to="/signup">
            <Join>Join now</Join>
          </Link>
          <Link to="/signin">
            <SignIn>Sign in</SignIn>
          </Link>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
        <Arrow>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Arrow>
        <Form></Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 140px;
    height: 54px;
    @media (max-width: 840px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 18px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 450px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 840px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    margin-top: 70px;
    @media (max-width: 840px) {
      margin-bottom: 20px;
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
      margin-top: 0px;
    }
  }
  img {
    // z-index: 1;
    width: 550px;
    height: 550px;
    position: absolute;
    top:35px;
    bottom: 0px;
    right: -150px;
    @media (max-width: 840px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 840px) {
    margin: auto;
    margin-top: 20px;
  }
`;

const Arrow = styled.div`

  position: absolute;
  top: 47%;
  left: 36%;
  transform: rotate(270deg); 
  span{
    display: block;
    width: 30px;
    height: 30px;
    margin-right: 50px;
    border-bottom: 5px solid #2977c9;
    border-right: 5px solid #2977c9;
    transform: rotate(45deg);
    margin: -10px;
    animation: scroll1 2s infinite;
  }
  span:nth-child(2) {
    animation-delay: .2s;  
  }
  span:nth-child(3) {
    animation-delay: .4s;
  }
  span:nth-child(4) {
    animation-delay: .6s;
  }
  span:nth-child(5) {
    animation-delay: .8s;
  }

  @keyframes scroll1 {
    0% {
        opacity: 1;
        transform: rotate(45deg) translate(-20px, -20px);
        border-bottom: 5px solid #ff6a06;
        border-right: 5px solid #ff9b06;
    }
    50% {
        opacity: 1;
        transform: rotate(45deg) translate(-20px, -20px);
    }
    100% {
        opacity: 1;
        transform: rotate(45deg) translate(-20px, -20px);
    }
  }
}`;

export default Login;
