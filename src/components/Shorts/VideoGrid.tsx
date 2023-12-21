import React from "react";
import styled from "styled-components";
import { Video } from "../../types/video";

interface VideoProps {
    videos : Video[]
}

export const VideoGrid = ( { videos } : VideoProps ) => {

  return (
    <VideoGridContainer>
      {videos.map((video) => (
        <VideoCard key={video.videoId}>
            <DateContainer><p>{video.date}</p></DateContainer>
          <video src={video.videoUrl} autoPlay/>
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
  padding: 16px;
  padding-top: 110px;

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