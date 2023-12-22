import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Video } from "../../types/video";

interface VideoProps {
    videos : Video[]
}

export const VideoGrid = ( { videos } : VideoProps ) => {

  const navigate = useNavigate();

  return (
    <VideoGridContainer>
      {videos.map((video) => (
        <VideoCard key={video.videoId} onClick={()=>{
          navigate('/shortsdetail', { state : {video:video, videos:videos}})
        }}>
          <video src={video.videoUrl}/>
          <div>
            <p>{video.name}</p>
          </div>
        </VideoCard>
      ))}
    </VideoGridContainer>
  );
};

const VideoGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-top: 120px;

  width: 360px;
`;

const VideoCard = styled.div`
  position: relative;
  overflow: hidden;

  video {
    width: 100%;
    border-radius: 10px;
    height: auto;
  }

  div {
    position: absolute;
    bottom: 0;
    color: white;
    margin-top: 15px;
    padding-bottom: 15px;
    padding-right: 15px;
    padding-left: 20px;
    width: 100%;
  }
`;

const DateContainer = styled.div`

  font-size: 20px;
  font-family: "KBFGDisplayB";
  margin: 0;
  color: white;
  margin-left: 270px;
  top: 5%;

`;