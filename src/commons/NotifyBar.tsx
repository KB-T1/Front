import React from "react";
import styled from "styled-components";
import heart from "../assets/heart.png";
import front from "../assets/front.png";
import { P2 } from "./Text";

interface NotifyBarProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function NotifyBar({ children, onClick }: NotifyBarProps) {
  return (
    <NotifyBarContainer onClick={onClick}>
      <img src={heart} />
      <P2>{children}</P2>
      <img src={front} />
    </NotifyBarContainer>
  );
}

const NotifyBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 353px;
  height: 50px;
  background-color: var(--main3, #ffe992);
  filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.1));
  border-radius: 20px;
  margin: 0 auto;
  & > p {
    display: inline;
    margin-right: 70px;
  }
  & > img:first-child {
    margin-left: 20px;
  }
  & > img:last-child {
    margin-right: 13px;
  }
`;
