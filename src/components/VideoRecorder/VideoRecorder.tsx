import React, { useRef, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import videoStartImg from "../../assets/videoStart.png";
import videoPlayImg from "../../assets/videoPlay.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../commons/Navbar";

// 동영상 촬영을 위한 컴포넌트
// https://9ummy.tistory.com/24 참고

interface VideoRecorderProps {
  isReply: boolean;
  receiverId: number;
  senderId: number;
  amount: number;
  transferId: number;
  name: string;
  nickname: string;
}

export default function VideoRecorder({
  isReply,
  receiverId,
  senderId,
  amount,
  transferId,
  name,
  nickname,
}: VideoRecorderProps) {
  const fileInputRef = React.createRef<HTMLInputElement>();

  const [videoFile, setVideoFile] = useState<File | null>();
  useEffect(() => {
    // 페이지가 로드되면 input 클릭
    fileInputRef.current?.click();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

  const navigate = useNavigate();

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const mediaRecorder = useRef<MediaRecorder | null>(null);
  // const videoChunks = useRef<Blob[]>([]);

  // const [isRecorded, setIsRecorded] = useState<boolean>(false);

  // const videoChangeState = () => {
  //   if (!isRecorded) {
  //     setIsRecorded(!isRecorded);
  //     mediaRecorder.current?.start();
  //     start();
  //   } else {
  //     setIsRecorded(!isRecorded);
  //     mediaRecorder.current?.stop();
  //     stop();
  //   }
  // };

  // const onClickCancel = () => {
  //   mediaRecorder.current = null;
  //   videoChunks.current = [];
  //   setIsRecorded(false);
  //   reset();
  // };

  // const getMediaPermission = useCallback(async () => {
  //   try {
  //     const audioConstraints = { audio: true };
  //     const videoConstraints = {
  //       audio: false,
  //       video: true, // 모바일에서 전면 카메라 사용을 위해 추가
  //     };

  //     const audioStream =
  //       await navigator.mediaDevices.getUserMedia(audioConstraints);
  //     const videoStream =
  //       await navigator.mediaDevices.getUserMedia(videoConstraints);

  //     if (videoRef.current) {
  //       videoRef.current.srcObject = videoStream;
  //     }

  //     // MediaRecorder 추가
  //     const combinedStream = new MediaStream([
  //       ...videoStream.getVideoTracks(),
  //       ...audioStream.getAudioTracks(),
  //     ]);

  //     const recorder = new MediaRecorder(combinedStream, {
  //       mimeType: "video/webm",
  //     });

  //     recorder.ondataavailable = (e) => {
  //       if (typeof e.data === "undefined") return;
  //       if (e.data.size === 0) return;
  //       videoChunks.current.push(e.data);
  //     };

  //     mediaRecorder.current = recorder;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   getMediaPermission();
  // }, []);

  // // 동영상 Blob으로 바꿔서 로컬에 저장

  // //TODO 아직 서버에 전송하는 코드 만들어야 함.

  const [url, setUrl] = useState<string | null>(null);

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setVideoFile(event.target.files && event.target.files[0]);
    console.log("selectedFile", selectedFile);
    if (selectedFile) {
      const videoBlob = new Blob([selectedFile], { type: "video/mp4" });

      console.log("Video Blob:", videoBlob);
      console.log("Video Blob:", videoBlob.size);
      const videoUrl = URL.createObjectURL(videoBlob);
      setUrl(videoUrl);
    }
  };
  const downloadVideo = () => {
    const navigateTo = isReply ? "/responseconfirm" : "/transferconfirm";
    navigate(`${navigateTo}`, {
      state: {
        videoFile: videoFile,
        videoUrl: url,
        senderId: senderId,
        receiverId: receiverId,
        transferId: transferId,
        amount: amount,
        name: name,
        nickname: nickname,
      },
    });
  };

  // //사용자 정의 Hook
  // const useCounter = (initialValue: number, ms: number) => {
  //   const [count, setCount] = useState(initialValue);
  //   const intervalRef = useRef<number | null>(null);
  //   const start = useCallback(() => {
  //     if (intervalRef.current !== null) {
  //       return;
  //     }
  //     intervalRef.current = window.setInterval(() => {
  //       setCount((c) => c + 1);
  //     }, ms);
  //   }, []);
  //   const stop = useCallback(() => {
  //     if (intervalRef.current === null) {
  //       return;
  //     }
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //   }, []);
  //   const reset = useCallback(() => {
  //     setCount(0);
  //     stop();
  //   }, []);
  //   return { count, start, stop, reset };
  // };

  // const [currentHours, setCurrentHours] = useState(0);
  // const [currentMinutes, setCurrentMinutes] = useState(0);
  // const [currentSeconds, setCurrentSeconds] = useState(0);
  // const { count, start, stop, reset } = useCounter(0, 1000);

  // // 타이머 기능
  // const timer = () => {
  //   const checkMinutes = Math.floor(count / 60);
  //   const hours = Math.floor(count / 3600);
  //   const minutes = checkMinutes % 60;
  //   const seconds = count % 60;
  //   setCurrentHours(hours);
  //   setCurrentSeconds(seconds);
  //   setCurrentMinutes(minutes);
  // };

  // count의 변화에 따라 timer 함수 랜더링
  // useEffect(timer, [count]);

  return (
    <>
      <Navbar type="back"> </Navbar>
      <VideoWrapper>
        {url ? (
          <video src={url} autoPlay />
        ) : (
          <input
            ref={fileInputRef}
            type="file"
            id="camera"
            name="camera"
            accept="video/*"
            onChange={handler}
            capture="user"
          />
        )}
        <VideoContainer>
          <CancelButton>취소</CancelButton>
          <StoreButton onClick={downloadVideo}>완료</StoreButton>
        </VideoContainer>
      </VideoWrapper>
    </>
  );
}

VideoRecorder.defaultProps = {
  isReply: false,
};

const VideoWrapper = styled.div`
  max-width: 393px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  & > video {
    margin-top: 10px;
    position: relative;
    width: 393px;
    height: 85%;
    object-fit: cover;
  }
  & > input {
    width: 393px;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
  }
`;

const VideoPlayButton = styled.button<{
  onClick?: any;
  state?: boolean;
  type?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  flex-grow: 1;
  background-color: white;
  padding: 0;
  height: 20%;
  border: 0;

  margin: auto;

  & > p {
    position: relative;
    top: 12px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 3%;

  flex-grow: 1;

  justify-content: space-between;
  margin-left: 10%;
  margin-right: 10%;
`;

const CancelButton = styled.button<{
  onClick?: any;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-family: "KBFGDisplayL";
  margin: 0;

  color: #000000;

  border: 0;
  background-color: white;
`;

const StoreButton = styled.button<{
  onClick?: any;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-family: "KBFGDisplayB";
  margin: 0;

  color: #1f9f7d;

  border: 0;
  background-color: white;
`;

const TimerContainer = styled.div`
  z-index: 50;

  font-size: 12px;
  font-family: "KBFGDisplayB";
  margin: 0;
  color: white;

  position: absolute;
  margin-left: 270px;
  top: 5%;
`;

const Timer = styled.div`
  z-index: 50;

  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;

  border-radius: 40px;
  background-color: red;
`;
