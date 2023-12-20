import styled from "styled-components";
import { P2 } from "./Text";
import back from "../assets/back.png";
import esc from "../assets/esc.png";

interface NavbarProps {
  type: "back" | "esc";
  onClick?: () => void;
  children: React.ReactNode;
}

export function Navbar({ type, children, onClick }: NavbarProps) {
  const goBack = () => {
    window.history.back();
  };

  return (
    <NavbarContainer>
      <NavbarChild>
        {type === "back" ? (
          <img
            onClick={onClick !== undefined ? onClick : goBack}
            src={back}
            alt="goBack"
          ></img>
        ) : (
          <div></div>
        )}
      </NavbarChild>
      <NavbarChild>
        <P2>{children}</P2>
      </NavbarChild>
      <NavbarChild>
        {type === "esc" ? (
          <img
            onClick={onClick !== undefined ? onClick : goBack}
            src={esc}
            alt="esc"
          ></img>
        ) : (
          <div></div>
        )}
      </NavbarChild>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 48px;
  width: 100%;
  height: 28px;
`;

const NavbarChild = styled.div`
  & > div {
    width: 28px;
    height: 100%;
  }
`;
