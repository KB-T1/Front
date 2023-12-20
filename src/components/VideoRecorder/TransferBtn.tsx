import styled from "styled-components";
import profilePicLamu from "../../assets/profilePicLamu.svg";
import profilePicBibi from "../../assets/profilePicBibi.svg";
import profilePicColi from "../../assets/profilePicColi.svg";
import profilePicKiki from "../../assets/profilePicKiki.svg";
import profilePicAlgu from "../../assets/profilePicAlgu.svg";
import { P2, Comment, P3 } from "../../commons/Text";
import smallFront from "../../assets/smallFront.svg";
import yellowHeart from "../../assets/yellowHeart.svg";

interface TransferBtnProps {
  profile: string;
  name: string;
  relationship: string;
  onClickTransferBtn: () => void;
  onClickDetailBtn: () => void;
}

export function TransferBtn({ profile, name, relationship }: TransferBtnProps) {
  const profileConverter = (profile: string) => {
    if (profile === "lamu") {
      return profilePicLamu;
    }
    else if (profile === "bibi") {
      return profilePicBibi;
    }
    else if (profile === "coli") {
      return profilePicColi;
    }
    else if (profile === "kiki") {
      return profilePicKiki;
    }
    else {
      return profilePicAlgu;
    }
  };

  return (
    <TransferBtnContainer>
      <TopContainer>
        <img src={profileConverter(profile)} />
        <P2>{name}</P2>
        <Comment>{relationship}</Comment>
        <img src={smallFront} />
      </TopContainer>
      <BottomContainer>
        <P3>마음전하기</P3>
        <img src={yellowHeart} />
      </BottomContainer>
    </TransferBtnContainer>
  );
}

const TransferBtnContainer = styled.div`
  width: 170px;
  height: 100px;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  margin-bottom: 12px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-sizing: border-box;
  height: 60%;
  border-radius: 20px 20px 0px 0px;
  background: var(--white, #fff);

  & > img:first-child {
    margin-right: 6px;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
  height: 40%;
  border-radius: 0px 0px 20px 20px;
  background-color: #fff4c8;

  & > img {
    margin-left: 12px;
  }
`;
