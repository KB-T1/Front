import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { barState } from "../states/barstate";

import { Comment2 } from "./Text";

export function Tabbar() {
  const [tabbarState, setTabbarState] = useRecoilState(barState);

  const navigate = useNavigate();
  const handleClick = (content: string) => {
    setTabbarState(content);
  };

  return (
    <TabbarContainer>
      <TabButton
        onClick={() => {
          handleClick("home");
          navigate("/home");
        }}
        state={tabbarState}
        content="home"
      >
        <Comment2>홈</Comment2>
      </TabButton>
      <TabButton
        onClick={() => {
          handleClick("shortslist");
          navigate("/shortslist");
        }}
        state={tabbarState}
        content="shortslist"
      >
        <Comment2>보관함</Comment2>
      </TabButton>
      <TabButton
        onClick={() => {
          handleClick("calendar");
          navigate("/calendar");
        }}
        state={tabbarState}
        content="calendar"
      >
        <Comment2>캘린더</Comment2>
      </TabButton>
      <TabButton
        onClick={() => {
          handleClick("ranking");
          navigate("/ranking");
        }}
        state={tabbarState}
        content="ranking"
      >
        <Comment2>랭킹</Comment2>
      </TabButton>
      <TabButton
        onClick={() => {
          handleClick("challenge");
          navigate("/challenge");
        }}
        state={tabbarState}
        content="challenge"
      >
        <Comment2>챌린지</Comment2>
      </TabButton>
    </TabbarContainer>
  );
}

const TabbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;

  width: 100%;
  max-width: 420px;
  height: 62px;
  border-top: 1px solid var(--gray4, #bababa);
`;

const TabButton = styled.button<{
  onClick?: any;
  state?: string;
  content?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 1;

  padding: 0;
  height: 100%;
  border: 0;

  color: ${(props) => (props.state === props.content ? "#FFDA49" : "#666560")};

  background-image: ${(props) =>
    props.content === "home"
      ? props.state === "home"
        ? "url('../assets/homeSelected.png');"
        : "url('../assets/homeDefault.png');"
      : props.content === "shortslist"
        ? props.state === "shortslist"
          ? "url('../assets/videoSelected.png');"
          : "url('../assets/videoDefault.png');"
        : props.content === "calendar"
          ? props.state === "calendar"
            ? "url('../assets/calendarSelected.png');"
            : "url('../assets/calendarDefault.png');"
          : props.content === "ranking"
            ? props.state === "ranking"
              ? "url('../assets/rankingSelected.svg');"
              : "url('../assets/rankingDefault.svg');"
            : props.state === "challenge"
              ? "url('../assets/challengeSelected.svg');"
              : "url('../assets/challengeDefault.svg');"};

  background-position: center 10px;
  background-size: 24px;
  background-repeat: no-repeat;

  & > p {
    position: relative;
    top: 12px;
  }
`;
