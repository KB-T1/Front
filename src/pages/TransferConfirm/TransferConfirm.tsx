import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3 } from "../../commons/Text";
import tmpVideo from "../../assets/tmpVideo.svg";
import { ButtonYellow } from "../../commons/Button";
import heartLetter from "../../assets/heartLetter.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useUploadVideo } from "../../ReactQuery";

export default function TransferConfirm() {
  const [realSend, setRealSend] = useState<boolean>(false);
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<Blob>(new Blob());

  const location = useLocation();

  const videoUrl = location.state.videoUrl;
  const senderId = location.state.senderId;
  const name = location.state.name;
  const nickname = location.state.nickname;
  const receiverId = location.state.receiverId;
  const amount = location.state.amount;
  const transferId = -1;

  const onClickHandler = () => {
    setRealSend(true);
    console.log("state", location.state);
    TransferEvent();
  };

  const uploadVideo = useUploadVideo({
    amount: amount,
    senderId: senderId,
    receiverId: receiverId,
    video: videoData,
    transferId: -1,
  });

  const TransferEvent = async () => {
    const response = await fetch(videoUrl);
    const blobData = await response.blob();
    // 가져온 Blob 데이터를 사용하여 Blob 객체 생성
    const blobObject = new Blob([blobData], { type: "video/webm" });

    setVideoData(blobObject);

    uploadVideo.mutate();
    if (uploadVideo.isSuccess) {
      console.log("success");
    }
  };

  return (
    <TransferConfirmContainer>
      {!realSend && (
        <>
          <Navbar type="back"> </Navbar>
          <Header>
            <H3>
              {name}({nickname}) 님에게
            </H3>
            <H3>{amount.toLocaleString()}원과 마음을 보낼게요.</H3>
          </Header>
          <VideoBox>
            <Video src={videoUrl} width={320} height={530}></Video>
            <span>
              <input type="checkbox" />
              답장 꼭 받기
            </span>
          </VideoBox>
          <ButtonYellow onClick={onClickHandler}>마음 보내기</ButtonYellow>
        </>
      )}
      {realSend && (
        <>
          <Header2>
            <H3>
              {name}({nickname}) 님에게
            </H3>
            <H3>{amount.toLocaleString()}원과 마음을 보냈어요.</H3>
          </Header2>
          <VideoBox>
            <img src={heartLetter} alt="letter" width={120} />
          </VideoBox>
          <ButtonYellow
            onClick={() => {
              navigate("/home");
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
  margin-top: 80px;
  margin-bottom: 6px;
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
