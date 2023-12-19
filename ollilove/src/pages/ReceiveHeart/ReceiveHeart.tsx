import React, { useState } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3 } from "../../commons/Text";

import { ButtonYellow } from "../../commons/Button";
import heartLetter from "../../assets/heartLetter.svg";
import money from "../../assets/money.svg";
import tmpVideo from "../../assets/tmpVideo.svg";
import { useNavigate } from "react-router-dom";

export default function ReceiveHeart() {
  const [onPlay, setOnPlay] = useState<number>(0);
  const navigate = useNavigate();

  const tmpData = {
    name: "이수민",
    relationship: "따님",
    amount: 500000,
  };

  return (
    <TransferConfirmContainer>
      {onPlay === 0 && (
        <>
          <Navbar type="esc"> </Navbar>
          <Header>
            <H3>
              {tmpData.name}({tmpData.relationship}) 님이
            </H3>
            <H3>{tmpData.amount.toLocaleString()}원과 마음을 보냈어요.</H3>
          </Header>
          <VideoBox>
            <img src={heartLetter} alt="letter" width={120} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              setOnPlay(1);
            }}
          >
            영상보고 마음받기
          </ButtonYellow>
        </>
      )}
      {onPlay === 1 && (
        <>
          <Navbar
            onClick={() => {
              setOnPlay(0);
            }}
            type="back"
          >
            {" "}
          </Navbar>
          <Header2>
            <H3>
              {tmpData.name}({tmpData.relationship}) 님이 보낸 영상을 보고
            </H3>
            <H3>용돈을 받아보세요.</H3>
          </Header2>
          <VideoBox>
            <img src={tmpVideo} alt="video" width={250} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              setOnPlay(2);
            }}
          >
            용돈 받기
          </ButtonYellow>
        </>
      )}
      {onPlay === 2 && (
        <>
          <Navbar type="esc"> </Navbar>
          <Header>
            <H3>
              {tmpData.name}({tmpData.relationship}) 님에게
            </H3>
            <H3>{tmpData.amount.toLocaleString()}원을 받았어요.</H3>
          </Header>
          <VideoBox>
            <img src={money} alt="letter" width={250} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              navigate("/responserecord");
            }}
          >
            영상편자로 답장하기
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
  margin-bottom: 186px;
`;

const Header2 = styled.div`
  margin-left: 20px;
  margin-top: 36px;
  margin-bottom: 36px;
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
