import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Video } from "../../types/video";
import { useInView } from "react-intersection-observer";

interface VideoProps {
  videos: Video[];
}

export const VideoDetail = ({ videos }: VideoProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <VideoDetailContainer>
      {videos.map((video, i) => {
        return (
          <VideoCard ref={ref} key={video.videoId}>
            <video ref={videoRef} controls>
              <source src={video.videoUrl} type="video/mp4" />
            </video>
            <div>
              <p>{video.name}</p>
            </div>
          </VideoCard>
        );
      })}
    </VideoDetailContainer>
  );
};

const VideoDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 70px;
  width: 90%;
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
