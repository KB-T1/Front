import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3 } from "../../commons/Text";

import { ButtonYellow } from "../../commons/Button";
import heartLetter from "../../assets/heartLetter.svg";
import money from "../../assets/money.svg";
import tmpVideo from "../../assets/tmpVideo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { FamilyMember } from "../../types/familyMember";
import { TransferInfo } from "../../types/transferInfo";
import Confetti from "react-confetti";

export default function ReceiveHeart() {
  const location = useLocation();
  const [onPlay, setOnPlay] = useState<number>(0);
  const [transfer, setTransfer] = useState<TransferInfo>(
    location.state.transfer
  );

  const targetId = location.state.targetId;
  const transferId = location.state.transferId;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("transfer", transfer);
    console.log();
  }, []);

  return (
    <TransferConfirmContainer>
      {onPlay === 0 && (
        <>
          <Navbar type="esc"> </Navbar>
          <Header>
            <H3>
              {transfer?.senderName}({transfer?.senderNickName}) 님이
            </H3>
            <H3>
              {transfer.amount === -1
                ? "마음을 보냈어요"
                : `${transfer?.amount.toLocaleString()}원과 마음을 보냈어요.`}
            </H3>
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
              {transfer.senderName}({transfer.senderNickName}) 님이 보낸 영상을
              보고
            </H3>
            <H3>용돈을 받아보세요.</H3>
          </Header2>
          <VideoBox>
            {/* <img src={tmpVideo} alt="video" width={250} /> */}
            <video src="/assets/video1.mp4" width={250} autoPlay />
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
          <Confetti style={{ margin: "0 auto" }} width={420} height={720} />
          <Navbar type="esc"> </Navbar>
          <Header>
            <H3>
              {transfer.senderName}({transfer.senderNickName}) 님에게
            </H3>
            <H3>
              {transfer.amount === -1
                ? `마음을 받았어요.`
                : `${transfer.amount.toLocaleString()}원을 받았어요.`}
            </H3>
          </Header>
          <VideoBox>
            <img src={money} alt="letter" width={250} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              navigate("/responserecord", {
                state: {
                  senderId: transfer.senderId,
                  receiverId: targetId,
                  transferId: transferId,
                },
              });
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

  & > video {
    margin-top: 102px;
  }
`;
