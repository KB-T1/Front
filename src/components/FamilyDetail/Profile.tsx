import styled from "styled-components";
import lamu from "../../assets/profilePicLamu.svg";
import settingBtn from "../../assets/settingBtn.svg";
import { H3, P3 } from "../../commons/Text";

interface ProfileProps {
  profile?: string;
  name?: string;
  relationship?: string;
  onProfileClick: () => void;
}

export function Profile({
  profile,
  name,
  relationship,
  onProfileClick,
}: ProfileProps) {
  const tmpInfo = {
    profile: "lamu",
    name: "이수민",
    relationship: "따님",
  };

  return (
    <ProfileContainer>
      <img src={lamu} alt="profile" width={48} />
      <H3>{tmpInfo.name}</H3>
      <P3>{tmpInfo.relationship}</P3>
      <img onClick={onProfileClick} src={settingBtn} alt="setting" />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  width: 353px;
  height: 48px;
  margin-top: 36px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > h3 {
    margin-left: 12px;
  }

  & > p {
    margin-left: 6px;
  }

  & > img:last-child {
    margin-left: 12px;
  }
`;
