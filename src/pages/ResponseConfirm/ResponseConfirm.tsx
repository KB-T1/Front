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

  const location = useLocation();

  const queryClient = new QueryClient();
  const videoUrl = location.state.videoUrl;
  const senderId = location.state.senderId;
  const receiverId: number = location.state.receiverId;
  const transferId = location.state.transferId;

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

      setTransferInfo(tmpData);
    }
  }, [isSuccess]);

  const onClickHandler = () => {
    setRealSend(true);

    TransferEvent();
  };

  const TransferEvent = async () => {
    const response = await fetch(videoUrl);
    const blobData = await response.blob();
    // 가져온 Blob 데이터를 사용하여 Blob 객체 생성
    const blobObject = new Blob([blobData], { type: "video/webm" });
    const uploadVideo = useUploadVideo({
      amount: -1,
      senderId: senderId,
      receiverId: receiverId,
      video: blobObject,
      transferId: transferId,
    });
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
              {transferInfo &&
                `${transferInfo.senderName}(${transferInfo.senderNickName}) 님에게`}
            </H3>
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
            <H3>
              {transferInfo &&
                `${transferInfo.senderName}(${transferInfo.senderNickName}) 님에게`}
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
