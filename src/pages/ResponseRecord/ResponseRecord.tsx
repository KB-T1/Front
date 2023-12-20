import React, { useState } from "react";
import VideoRecorder from "../../components/VideoRecorder/VideoRecorder";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H2 } from "../../commons/Text";
import camera from "../../assets/camera.svg";
import { ButtonYellow } from "../../commons/Button";

export default function ResponseRecord() {
  const [onRecord, setOnRecord] = useState<boolean>(false);
  return (
    <>
      {!onRecord && (
        <TransferRecordContainer>
          <Navbar type="back"> </Navbar>
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
      )}
      {onRecord && <VideoRecorder isReply={true} />}
    </>
  );
}

const TransferRecordContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > h2:nth-child(2) {
    padding-top: 36px;
  }

  & > h2:nth-child(3) {
    margin-bottom: 180px;
  }

  & > button {
    position: fixed;
    bottom: 41px;
  }
`;
