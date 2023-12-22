import React, { useEffect, useState } from "react";
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
import { FamilyMember } from "../../types/familyMember";

interface FamilyMemberDetailProps {
  name?: string;
  relationship?: string;
}

export default function FamilyMemberDetail({
  name,
  relationship,
}: FamilyMemberDetailProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [myId, setMyId] = useState<number>(0);
  const [targetId] = useState<number>(Number(location.state));
  const [familyId, setFamilyId] = useState<string | null>("");
  const [transferData, setTransferData] = useState<TransferInfo[]>([]);
  const [member, setMember] = useState<FamilyMember>();

  const queryClient = new QueryClient();

  const transferListQuery = useGetTransferPersonal({
    targetUserId: targetId,
  });
  const familyInfoQuery = useGetFamilyInfo({ targetId });

  useEffect(() => {
    const localStorageFamilyId = localStorage.getItem("familyId");
    const localStorageUserId = localStorage.getItem("userId");

    if (localStorageUserId !== null || localStorageFamilyId !== null) {
      setMyId(Number(localStorageUserId));
      setFamilyId(localStorageFamilyId);
    } else {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    if (transferListQuery.isSuccess) {
      setTransferData(transferListQuery.data);
    }
  }, [transferListQuery.isSuccess]);

  const user = queryClient.getQueryData(["getUser", targetId]);

  useEffect(() => {
    console.log("familyInfoSuccess");
    const data = familyInfoQuery.data;

    if (!data) {
      return;
    }
    console.log(data);
    setMember({
      ...data.filter((el) => {
        return targetId === el.userId;
      })[0],
    });
  }, [familyInfoQuery.isSuccess]);

  const onClose = () => {
    familyInfoQuery.refetch().then((res) => {
      const data = res.data;

      if (!data || !member) {
        return;
      }

      const changeMember = data.filter((el) => {
        return targetId === el.userId;
      })[0];

      console.log("setMember", changeMember, {
        ...member,
        nickname: changeMember.nickname,
      });
      setMember({ ...member, nickname: changeMember.nickname });
    });

    setIsOpen(false);
  };

  useEffect(() => {
    console.log("member changed", member);
  }, [member]);

  const onProfileClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {member && (
        <Navbar type="back">
          {member?.userName}({member?.nickname}님)과의 기록
        </Navbar>
      )}
      <FamilyMemberDetailContainer isOpen={isOpen}>
        <Profile
          profile={member ? member.profile : ""}
          name={member?.userName}
          relationship={member?.nickname}
          onProfileClick={onProfileClick}
        ></Profile>
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
            console.log("receiveheart", el);
            return (
              <RecentBtn
                key={i}
                profile={
                  el.senderId === myId ? el.receiverProfile : el.senderProfile
                }
                name={el.senderId === myId ? el.receiverName : el.senderName}
                relationship={
                  el.senderId === myId ? el.receiverNickName : el.senderNickName
                }
                amount={el.amount}
                time={el.createdAt}
                heart={el.amount === -1 ? true : false}
                onClickTransfer={() => {
                  navigate("/receiveheart", { state: el });
                }}
              ></RecentBtn>
            );
          })}
        </RecordHeartBox>
        {isOpen && <ModalBox></ModalBox>}
        <Modal
          setTransferData={setTransferData}
          targetedId={targetId}
          targeterId={myId}
          nickName={nickName}
          setNickName={setNickName}
          isOpen={isOpen}
          onClose={onClose}
        ></Modal>
      </FamilyMemberDetailContainer>
    </>
  );
}

const FamilyMemberDetailContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 48px;
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
