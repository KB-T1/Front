import React from "react";
import styled from "styled-components";
import { H3 } from "../../commons/Text";
import { Tabbar } from "../../commons/Tabbar";
import TopTabbar from "../../assets/topTabbar.svg";
import { VideoGrid } from "../../components/Shorts/VideoGrid";

export default function ShortsList() {

    const videos = [
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 1,
            name: "이수민",
            date: "2023-12-21",
        },
       
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 2,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 3,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 4,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 5,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 11,
            name: "이수민",
            date: "2023-12-21",
        },
       
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 12,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 13,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 14,
            name: "이수민",
            date: "2023-12-21",
        },
        {
            videoUrl: "/assets/tmpVideo.mp4",
            videoId: 15,
            name: "이수민",
            date: "2023-12-21",
        },
    ]
    
    return (
        <ShortsWrapper>
            <TopTabbarContainer>
                <H3>마음 보관함</H3>
                <img src={TopTabbar} alt="toptabbar" />
            </TopTabbarContainer>
            <VideoGrid videos={videos}/>
          <Tabbar />
        </ShortsWrapper>
      );
    }
    const ShortsWrapper = styled.div`
      margin-bottom: 40px;
      height: 100vh;
      box-sizing: border-box;

      & > div:last-child {
        margin-top: 70px;  
      }
    `;
    
    const TopTabbarContainer = styled.div`
        position:fixed;
        height: 70px;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: white;
        z-index: 2;
        margin-bottom: 10px;
    `;
