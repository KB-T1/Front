import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { NotifyBar } from "../../commons/NotifyBar";
import { Tabbar } from "../../commons/Tabbar";
import { H3 } from "../../commons/Text";
import { RecentBtn } from "../../components/FamilyDetail/RecentBtn";
import { TransferBtn } from "../../components/VideoRecorder/TransferBtn";
import { useGetFamilyInfo, useGetTransferAll } from "../../ReactQuery";
import { useRecoilState } from "recoil";
import { TransferInfo } from "../../types/transferInfo";
import { FamilyMember } from "../../types/familyMember";
import { QueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const navigate = useNavigate();

  //유저 정보 얻어오기
  const [userId, setUserId] = useState<number>(0);
  const [familyId, setFamilyId] = useState<string>("");

  const queryClient = new QueryClient();

  const [familydata, setFamilyData] = useState<FamilyMember[]>([]);
  const [transferList, setTransferList] = useState<TransferInfo[]>();
  const [recentTransferList, setRecentTransferList] = useState<TransferInfo>();
  const familyInfoQuery = useGetFamilyInfo({});
  const transferListQuery = useGetTransferAll({});

  const getTransferById = (id: number) => {
    if (transferList) {
      for (let i = 0; i < transferList.length; i++) {
        if (transferList[i].transferId === id) {
          return transferList[i];
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const localStorageUserId = localStorage.getItem("userId");
    const localStorageFamilyId = localStorage.getItem("familyId");

    if (localStorageUserId !== null && localStorageFamilyId != null) {
      setFamilyId(localStorageFamilyId);
      setUserId(Number(localStorageUserId));
    } else {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    if (familyInfoQuery.isSuccess) {
      setFamilyData(familyInfoQuery.data);
      console.log(familydata);
    }
  }, [familyInfoQuery.isSuccess]);

  useEffect(() => {
    if (transferListQuery.isSuccess) {
      setTransferList(transferListQuery.data);
      console.log(transferList);

      setRecentTransferList(
        transferListQuery.data.filter((el) => {
          return el.receiverId === userId;
        })[0]
      );
    }
  }, [transferListQuery.isSuccess]);

  useEffect(() => {
    console.log(familydata);
    console.log("transferList", transferList);
    console.log("recent", recentTransferList);
  }, [familydata, transferList]);

  const user = queryClient.getQueryData(["getUser", userId]);

  // 유저 가족 정보 & 송금 내역 가져오기

  if (!familyInfoQuery.isSuccess) {
    return (
      <div
        style={{
          height: "900px",
          width: "20%",
          marginTop: "40vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Oval color="#ff0000" height={100} width={100} />
      </div>
    );
  }

  if (familyInfoQuery.isError || transferListQuery.isError) {
    return <div>isError...</div>;
  }

  return (
    <HomeContainer>
      {recentTransferList && (
        <NotifyBar
          onClick={() => {
            navigate("/receiveheart", {
              state: {
                transfer: recentTransferList,
                transferId: recentTransferList.historyId,
                targetId: recentTransferList.receiverId,
              },
            });
          }}
        >
          새로운 마음이 도착했어요!
        </NotifyBar>
      )}
      <TransferContainer>
        <H3>영상으로 마음전하기</H3>
        <div>
          {familyInfoQuery.isSuccess ? (
            familydata.map((el, i) => {
              if (el.userId === userId) {
                return <></>;
              }

              return (
                <TransferBtn
                  key={i}
                  profile={el.profile}
                  name={el.userName}
                  relationship={el.nickname}
                  onClickDetailBtn={() => {
                    navigate(`/familymemberdetail/`, {
                      state: el.userId,
                    });
                  }}
                  onClickTransferBtn={() => {
                    navigate(`/transferamountinput/`, {
                      state: el.userId,
                    });
                  }}
                ></TransferBtn>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </TransferContainer>
      <RecentContainer>
        <H3>최근 주고받은 마음</H3>
        {transferListQuery.isSuccess &&
          transferList &&
          transferList.map((el, i) => {
            const transferId = el.transferId;
            const thisTransfer = getTransferById(transferId);

            console.log("thisTransfer", thisTransfer);
            if (!thisTransfer) {
              return <></>;
            }
            return (
              <RecentBtn
                userId={userId}
                senderId={el.senderId}
                key={i}
                profile={
                  el.senderId === userId ? el.receiverProfile : el.senderProfile
                }
                name={el.senderId === userId ? el.receiverName : el.senderName}
                relationship={
                  el.senderId === userId
                    ? el.receiverNickName
                    : el.senderNickName
                }
                amount={el.amount}
                time={el.createdAt}
                heart={el.amount === -1 ? true : false}
                onClickTransfer={() => {
                  if (el.senderId === userId) {
                    return;
                  }
                  navigate("/receiveheart", {
                    state: {
                      transfer: el,
                      transferId: el.historyId,
                      // targetName:
                      //   el.senderId === userId
                      //     ? el.receiverName
                      //     : el.senderName,
                      targetId: el.senderId,
                    },
                  });
                }}
              ></RecentBtn>
            );
          })}
      </RecentContainer>
      <Tabbar />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  padding-top: 28px;
  margin-bottom: 40px;
  height: 100vh;
  box-sizing: border-box;
`;

const TransferContainer = styled.div`
  margin: 0 20px;
  margin-top: 36px;

  & > h3 {
    padding-bottom: 18px;
  }
  & > div:last-child {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const RecentContainer = styled.div`
  margin: 0 20px;
  margin-top: 36px;
  overflow-x: scroll;

  & > h3 {
    padding-bottom: 18px;
  }
  & > div:last-child {
    margin-bottom: 80px;
  }
`;
