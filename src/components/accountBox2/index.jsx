import React, { useState } from "react";
import styled from "styled-components";

import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { Login } from "./Login";
import { Register } from "./Register";
const BoxContainer = styled.div`
  width: 450px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
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
  font-size: 11px;
  line-height: 5.24;
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

export function AccountBox2(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("Register");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  

  const switchToRegister = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("Register");
    }, 400);
  };
  const switchToLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("Login");
    }, 400);
  };

  

  const contextValue = {  switchToRegister, switchToLogin};

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
           {active === "Login" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
         
          {active === "Register" && (
            <HeaderContainer>
              <HeaderText>Create </HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please Sign-up as an Administrator to continue</SmallText>
            </HeaderContainer>
          )}
         
        </TopContainer>
        <InnerContainer>

          {active === "Register" && <Register/>}
          {active === "Login" && <Login/>}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}