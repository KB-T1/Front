import React, { useState } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H2 } from "../../commons/Text";
import camera from "../../assets/camera.svg";
import { ButtonYellow } from "../../commons/Button";
import { useLocation } from "react-router-dom";

export default function ResponseRecord() {
  const [onRecord, setOnRecord] = useState<boolean>(false);

  const location = useLocation();

  const senderId = location.state.senderId;
  const receiverId = location.state.receiverId;
  const transferId = location.state.transferId;

  console.log("responserecord", location.state.receiverName);
  console.log("receiverId", location.state.receiverId);
  console.log("transferId", location.state.transferId);
  console.log("responserecord", location.state.receiverNickName);
  return (
    <>
      {!onRecord && (
        <>
          <Navbar type="back"> </Navbar>
          <TransferRecordContainer>
            <H2>10초 이내로</H2>
            <H2>영상을 촬영해주세요!</H2>
            <img src={camera} alt="camera" width={120} />
            <ButtonYellow
              onClick={() => {
                setOnRecord(true);
              }}
            >
              촬영하기
            </ButtonYellow>
          </TransferRecordContainer>
        </>
      )}
      {onRecord && (
        <VideoRecorder
          isReply={true}
          transferId={transferId}
          senderId={senderId}
          receiverId={receiverId}
          amount={-1}
          name={location.state.receiverName}
          nickname={location.state.receiverNickName}
        />
      )}
    </>
  );
}

const TransferRecordContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  & > h2:nth-child(2) {
    /* padding-top: 36px; */
  }

  & > img {
    margin-top: 180px;
  }

  & > button {
    position: fixed;
    bottom: 41px;
  }
`;
