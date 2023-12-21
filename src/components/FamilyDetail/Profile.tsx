import styled from "styled-components";
import lamu from "../../assets/profilePicLamu.svg";
import settingBtn from "../../assets/settingBtn.svg";
import { H3, P3 } from "../../commons/Text";
import { profileMatcher } from "../../utils/profileMatcher";

interface ProfileProps {
  profile: string;
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
  return (
    <ProfileContainer>
      <img src={profileMatcher(profile)} alt="profile" width={48} />
      <H3>{name}</H3>
      <P3>{relationship}</P3>
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
