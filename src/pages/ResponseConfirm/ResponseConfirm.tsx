import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3 } from "../../commons/Text";
import tmpVideo from "../../assets/tmpVideo.svg";
import { ButtonYellow } from "../../commons/Button";
import heartLetter from "../../assets/heartLetter.svg";
import { useLocation } from "react-router-dom";

export default function ResponseConfirm() {
  const [realSend, setRealSend] = useState<boolean>(false);

  const location = useLocation();

  const videoUrl = location.state;

  const tmpData = {
    name: "이수민",
    relationship: "따님",
    amount: 500000,
  };

  return (
    <TransferConfirmContainer>
      {!realSend && (
        <>
          <Navbar type="back"> </Navbar>
          <Header>
            <H3>
              {tmpData.name}({tmpData.relationship}) 님에게
            </H3>
            <H3>답장을 보낼게요.</H3>
          </Header>
          <VideoBox>
          <Video src={videoUrl} width={320} height={530}>
          </Video>
            <span>
              <input type="checkbox" />
              답장 꼭 받기
            </span>
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              setRealSend(true);
            }}
          >
            마음 보내기
          </ButtonYellow>
        </>
      )}
      {realSend && (
        <>
          <Header2>
            <H3>
              {tmpData.name}({tmpData.relationship}) 님에게
            </H3>
            <H3>답장을 보냈어요.</H3>
          </Header2>
          <VideoBox>
            <img src={heartLetter} alt="letter" width={120} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              window.location.href = "/home";
            }}
          >
            완료
          </ButtonYellow>
        </>
      )}
    </TransferConfirmContainer>
  );
}

const TransferConfirmContainer = styled.div`
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
  margin-bottom: 36px;
`;

const Header2 = styled.div`
  margin-left: 20px;
  margin-top: 84px;
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

const Video = styled.video`
  width: 320px;
  height: 600px;
`;

const PlayPauseButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
`;