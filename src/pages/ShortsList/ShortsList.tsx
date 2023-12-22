import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { H3 } from "../../commons/Text";
import { Tabbar } from "../../commons/Tabbar";
import TopTabbar from "../../assets/topTabbar.svg";
import { VideoGrid } from "../../components/Shorts/VideoGrid";
import { Navbar } from "../../commons/Navbar";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "react-query";
import { useGetTransferAll } from "../../ReactQuery";
import { Video } from "../../types/video";

export default function ShortsList() {

    const navigate = useNavigate();

    const queryClient = new QueryClient();

    const [videos, setVideos] = useState<Video[]>();
    const transferListQuery = useGetTransferAll({});

    useEffect(() => {
        if (transferListQuery.isSuccess) {

          const localStorageUserId = localStorage.getItem("userId");
          const videolist:Video[] = []
          transferListQuery.data.map((el)=> {
            videolist.push({
                videoUrl:el.videoUrl,
                videoId:el.historyId,
                name: el.receiverId === Number(localStorageUserId) ? el.receiverName : el.senderName,
                date: el.createdAt
            })
          })
          setVideos(videolist);
          
          console.table(videolist)
        }
      }, [transferListQuery.isSuccess]);

    useEffect(()=>{
        
        console.table(videos)
    }, videos)

    
    return (
        <ShortsWrapper>
            <Navbar type="back"><H3>마음 보관함</H3></Navbar>
            <TopTabbarContainer>
                <img src={TopTabbar} alt="toptabbar" />
            </TopTabbarContainer>
            {videos && <VideoGrid videos={videos}/>}
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
        position:fixed;
        height: 60px;
        padding-top: 60px;
        background-color: white;
        z-index: 2;
    `;
