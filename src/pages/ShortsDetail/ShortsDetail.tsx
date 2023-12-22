import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { H3 } from "../../commons/Text";
import { Tabbar } from "../../commons/Tabbar";
import TopTabbar from "../../assets/topTabbar.svg";
import { VideoDetail } from "../../components/Shorts/VideoDetail";
import { Navbar } from "../../commons/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { Video } from "../../types/video";

export default function ShortsDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const videolist: Video[] = location.state.videos;
  const video: Video = location.state.video;
  const index: number = videolist.indexOf(video);
  const videos = videolist.slice(index).concat(videolist.slice(0, index - 1));

  return (
    <ShortsWrapper>
      <Navbar
        type="back"
        onClick={() => {
          navigate("/shortslist", { state: videos });
        }}
      >
        {" "}
      </Navbar>
      <VideoDetail videos={videos} />
      <Tabbar />
    </ShortsWrapper>
  );
}
const ShortsWrapper = styled.div`
  width: 393px;
  margin-bottom: 40px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > div:last-child {
    margin-top: 60px;
  }
`;

const TopTabbarContainer = styled.div`
  position: fixed;
  height: 70px;
  padding-top: 80px;
  background-color: white;
  z-index: 2;
`;
