import React, { useState } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H3, H4 } from "../../commons/Text";
import Modal from "../../components/FamilyDetail/nicknameModal";
import { Profile } from "../../components/FamilyDetail/Profile";
import { RecordBar } from "../../components/VideoRecorder/RecordBar";
import sendCall from "../../assets/sendCall.svg";
import sendMsg from "../../assets/sendMsg.svg";
import { RecentBtn } from "../../components/FamilyDetail/RecentBtn";
import { QueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetFamilyInfo, useGetTransferPersonal } from "../../ReactQuery";
import { TransferInfo } from "../../types/transferInfo";

interface FamilyMemberDetailProps {
  name?: string;
  relationship?: string;
}

export default function FamilyMemberDetail({
  name,
  relationship,
}: FamilyMemberDetailProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");

  const queryClient = new QueryClient();

  // 유저 가족 정보 & 송금 내역 가져오기

  const localStorageUserId = localStorage.getItem("userId");

  const [userId, setUserId] = useState<number>(0);

  if (localStorageUserId != null) {
    setUserId(JSON.parse(localStorageUserId));
  } else {
    navigate("/signup");
  }

  const localStorageFamilyId = localStorage.getItem("familyId");

  const [familyId, setFamilyId] = useState<string>("");

  const location = useLocation();

  const memberId = parseInt(location.state);

  const user = queryClient.getQueryData(["getUser", userId]);

  const familyInfoQuery = useGetFamilyInfo({ userId });

  const member = familyInfoQuery.data?.filter((el) => {
    return el.userId === memberId;
  })[0];

  const transferListQuery = useGetTransferPersonal({
    targetUserId: memberId,
  });

  const transferData = transferListQuery.data as TransferInfo[];

  const onClose = () => {
    setIsOpen(false);
  };

  const onProfileClick = () => {
    setIsOpen(true);
  };

  return (
    <FamilyMemberDetailContainer isOpen={isOpen}>
      <Navbar type="back">
        {member?.userName}({member?.nickName}님)과의 기록
      </Navbar>
      <Profile onProfileClick={onProfileClick}></Profile>
      <Bar>
        <img src={sendCall} alt="call" />
        <img src={sendMsg} alt="message" />
      </Bar>
      <RecordBox>
        <H3>주고받은 기록</H3>
        <RecordBar call={30} message={30} send={30}></RecordBar>
      </RecordBox>

      <RecordHeartBox>
        <H3>주고받은 마음</H3>
        {transferData.map((el, i) => {
          return (
            <RecentBtn
              key={i}
              profile={el.profile}
              name={el.senderId === userId ? el.receiverName : el.senderName}
              relationship={el.nickname}
              amount={el.amount}
              time={el.historyCreatedAt}
              heart={false}
              onClickTransfer={() => {
                navigate("/receiveheart", { state: el });
              }}
            ></RecentBtn>
          );
        })}
      </RecordHeartBox>
      {isOpen && <ModalBox></ModalBox>}
      <Modal
        nickName={nickName}
        setNickName={setNickName}
        isOpen={isOpen}
        onClose={onClose}
      ></Modal>
    </FamilyMemberDetailContainer>
  );
}

const FamilyMemberDetailContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 36px;
`;

const RecordBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 36px;

  h3 {
    margin-bottom: 1rem;
  }
`;

const RecordHeartBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 36px;

  h3 {
    margin-bottom: 1rem;
  }
`;
