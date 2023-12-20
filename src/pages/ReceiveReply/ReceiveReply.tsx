import { useState } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3 } from "../../commons/Text";
import heartLetter from "../../assets/heartLetter.svg";
import { ButtonYellow } from "../../commons/Button";
import tmpVideo from "../../assets/tmpVideo.svg";

export function ReceiveReply() {

  const [onPlay, setOnPlay] = useState<boolean>(false);
  
  const member = {
    userName: "이수민",
    nickName: "따님",
  };

  return (
    <ReceiveReplyContainer>
      {!onPlay && (
        <>
          <Navbar type="esc"> </Navbar>
          <Header>
            <H3>
              {member.userName}({member.nickName}) 님이
            </H3>
            <H3>답장을 보냈어요.</H3>
          </Header>
          <VideoBox>
            <img src={heartLetter} alt="letter" width={120} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              setOnPlay(true);
            }}
          >
            영상보고 마음받기
          </ButtonYellow>
        </>
      )}
      {onPlay && (
        <>
          <Navbar
            onClick={() => {
              setOnPlay(false);
            }}
            type="back"
          >
            {" "}
          </Navbar>
          <Header2>
            <H3>
              {member.userName}({member.nickName}) 님이 보낸 영상을 보고
            </H3>
            <H3>용돈을 받아보세요.</H3>
          </Header2>
          <VideoBox>
            <img src={tmpVideo} alt="video" width={250} />
          </VideoBox>
          <ButtonYellow>용돈 받기</ButtonYellow>
        </>
      )}
    </ReceiveReplyContainer>
  );
}

const ReceiveReplyContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    position: fixed;
    margin-left: 20px;
    bottom: 41px;
  }
`;

const Header = styled.div`
  margin-left: 20px;
  margin-top: 36px;
  margin-bottom: 186px;
`;

const VideoBox = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  font-size: 12px;
  font-family: "KBFGDisplayM";

  & > img {
    margin-bottom: 1rem;
  }
`;
const Header2 = styled.div`
  margin-left: 20px;
  margin-top: 36px;
  margin-bottom: 36px;
`;
