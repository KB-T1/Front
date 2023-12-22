import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Video } from "../../types/video";

interface VideoProps {
    videos : Video[]
}

export const VideoDetail = ( { videos } : VideoProps ) => {

  const navigate = useNavigate();

  return (
    <VideoDetailContainer>
      {videos.map((video) => (
        <VideoCard key={video.videoId}>
          <video src={video.videoUrl} autoPlay/>
          <div>
            <p>{video.name}</p>
          </div>
        </VideoCard>
      ))}
    </VideoDetailContainer>
  );
};

const VideoDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 20px;
  width: 360px;
`;

const VideoCard = styled.div`
  position: relative;
  overflow: hidden;

  video {
    width: 100%;
    height: auto;
  }

  div {
    position: absolute;
    bottom: 0;
    color: white;
    padding: 15px;
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