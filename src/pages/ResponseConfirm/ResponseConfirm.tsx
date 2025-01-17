import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3 } from "../../commons/Text";
import tmpVideo from "../../assets/tmpVideo.svg";
import { ButtonYellow } from "../../commons/Button";
import heartLetter from "../../assets/heartLetter.svg";
import { useLocation } from "react-router-dom";
import { useUploadVideo } from "../../ReactQuery";
import { QueryClient } from "react-query";
import { useGetTransferPersonal } from "../../ReactQuery";
import { TransferInfo } from "../../types/transferInfo";
export default function ResponseConfirm() {
  const [realSend, setRealSend] = useState<boolean>(false);
  const [transferInfo, setTransferInfo] = useState<TransferInfo>();
  const [fileSuccess, setFileSuccess] = useState<boolean>();
  const [videoData, setVideoData] = useState<Blob>(new Blob());
  const location = useLocation();

  const queryClient = new QueryClient();
  const videoUrl = location.state.videoUrl;
  const senderId = location.state.senderId;
  const receiverId: number = location.state.receiverId;
  const transferId = location.state.transferId;
  const name = location.state.name;
  const nickname = location.state.nickname;
  const videoFile = location.state.videoFile;

  const { isSuccess, data } = useGetTransferPersonal({
    targetUserId: receiverId,
  });
  const transferList = data as TransferInfo[];

  useEffect(() => {
    console.log(data);
    if (isSuccess) {
      const tmpData = transferList.filter((el) => {
        return el.historyId === transferId;
      })[transferList.length - 1];

      console.log("location state", location.state);
      setTransferInfo(tmpData);
    }
  }, [isSuccess]);

  const onClickHandler = () => {
    setRealSend(true);

    TransferEvent();
  };

  const uploadVideo = useUploadVideo({
    amount: -1,
    senderId: receiverId,
    receiverId: senderId,
    video: videoFile,
    transferId: transferId,
  });

  const TransferEvent = async () => {
    const response = await fetch(videoUrl);
    const blobData = await response.blob();
    // 가져온 Blob 데이터를 사용하여 Blob 객체 생성
    setVideoData(new Blob([blobData], { type: "video/webm" }));
    setFileSuccess(true);
    if (uploadVideo.isSuccess) {
      console.log("success");
    }
  };

  useEffect(() => {
    if (fileSuccess) {
      console.log("mydata", {
        amount: -1,
        senderId: senderId,
        receiverId: receiverId,
        video: videoData,
        transferId: transferId,
      });
      uploadVideo.mutate();
    }
  }, [fileSuccess]);

  return (
    <TransferConfirmContainer>
      {!realSend && (
        <>
          <Navbar type="back"> </Navbar>
          <Header>
            <H3>{`${name}(${nickname}) 님에게`}</H3>
            <H3>답장을 보낼게요.</H3>
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
            <H3>{`${name}(${nickname}) 님에게`}</H3>
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
  margin-top: 64px;
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
