import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./SignupForm";
import { ForgotForm }  from "./ForgotForm";
import {Resetform} from "./Resetform";

const BoxContainer = styled.div`
  width: 450px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 50px;
  background-color: #fff;
  box-shadow:inset 0px 0px 0 #fff, 0px 0px 0 rgba(128, 83, 35, 0.2);
  border:1px solid #000;
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 210%;
  height: 360px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -390px;
  left: -200px;
  background:  rgb(15, 97, 98);
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.00;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  line-height: 5.24;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 20px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signup");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const switchToForgot = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("forgot");
    }, 400);
  };

  const switchToreset = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("reset");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin, switchToForgot, switchToreset };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "forgot" && (
            <HeaderContainer>
              <HeaderText>Forgot</HeaderText>
              <HeaderText>Password</HeaderText>
              <SmallText>Please enter email to reset Password!</SmallText>
            </HeaderContainer>
          )}
           {active === "reset" && (
            <HeaderContainer>
              <HeaderText>Reset</HeaderText>
              <HeaderText>Password</HeaderText>
              <SmallText>Please enter new Password!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
          {active === "forgot" && <ForgotForm />}
          {active === "reset"  && <Resetform/>}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}