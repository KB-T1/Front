import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonGray, ButtonYellow } from "../../commons/Button";
import { Navbar } from "../../commons/Navbar";
import { Comment, H3 } from "../../commons/Text";
import { TextArea2 } from "../../commons/TextArea2";
import { useLocation, useNavigate } from "react-router-dom";
import { QueryClient } from "react-query";
import { useGetFamilyInfo } from "../../ReactQuery";
import { FamilyMember } from "../../types/familyMember";
import { useGetAccount } from "../../ReactQuery";
import { Account } from "../../types/account";

export default function TransferAmountInput() {
  const [amount, setAmount] = useState<number>(0);
  const [userId, setUserId] = useState<number>(
    Number(localStorage.getItem("userId"))
  );
  const [targetData, setTargetData] = useState<FamilyMember>();
  const [familyData, setFamilyData] = useState<FamilyMember[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [myMoney, setMyMoney] = useState<Account>();

  // props로 받은 state 받기
  const location = useLocation();
  const navigate = useNavigate();

  // 로컬 스토리지에서 유저 정보 받아오기
  useEffect(() => {
    if (userId === null) {
      navigate("/signup");
    }
  }, []);

  const queryClient = new QueryClient();

  const user = queryClient.getQueryData(["getUser", userId]);
  const familyQuery = useGetFamilyInfo({});

  const accountQuery = useGetAccount({ userId });

  // 가족 정보 받아와서 detail 가족 정보 찾기
  useEffect(() => {
    if (familyQuery.isSuccess && familyData.length === 0) {
      setFamilyData(familyQuery.data);
      console.log("familydata", familyQuery.data);

      const tmp = familyQuery.data.filter((el) => {
        return el.userId === location.state;
      });

      if (tmp.length === 1) {
        setTargetData(tmp[0]);
      }
    }
  }, [familyQuery.isSuccess]);

  useEffect(() => {
    console.log(familyQuery.data);
  }, [familyQuery]);

  //계좌정보
  useEffect(() => {
    if (accountQuery.isSuccess) {
      setMyMoney(accountQuery.data);
      console.log("accountdata", accountQuery.data);
    }
  }, [accountQuery.isSuccess]);

  return (
    <TransferAmountInputContainer>
      <Navbar type="esc"> </Navbar>
      <TransferContent>
        <H3>
          {targetData && targetData.userName}
          님께
        </H3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextArea2 setAmount={setAmount} amount={amount} placeholder="" />
          <H3>원을 보낼게요.</H3>
        </div>
      </TransferContent>
      <MoneyBtnWrapper>
        <MoneyBtn
          onClick={() => {
            setAmount(amount + 10000);
          }}
        >
          +1만
        </MoneyBtn>
        <MoneyBtn
          onClick={() => {
            setAmount(amount + 100000);
          }}
        >
          +10만
        </MoneyBtn>
        <MoneyBtn
          onClick={() => {
            setAmount(amount + 500000);
          }}
        >
          +50만
        </MoneyBtn>
      </MoneyBtnWrapper>
      <Comment style={{ fontSize: "16px", width: "360px", textAlign: "right" }}>
        출금 가능 금액: {myMoney && myMoney.balance.toLocaleString()}원
      </Comment>
      {familyData.filter((el) => {
        return el.userId === location.state;
      })[0] &&
      amount > 0 && myMoney &&
      amount <= myMoney.balance ? (
        <ButtonYellow
          onClick={() => {
            navigate("/transferrecord", {
              state: {
                senderId: userId,
                receiverId: targetData && targetData.userId,
                amount: amount,
                receiverName: targetData?.userName,
                receiverNickName: targetData?.nickname,
              },
            });
          }}
        >
          확인
        </ButtonYellow>
      ) : (
        <ButtonGray>확인</ButtonGray>
      )}
    </TransferAmountInputContainer>
  );
}

const TransferAmountInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    margin: 0 auto;
    margin-top: 143px;
  }
`;

const TransferContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 36px;
  margin-left: 40px;

  & > h3 {
    margin-bottom: 36px;
  }
`;

const MoneyBtnWrapper = styled.div`
  margin-top: 48px;
  margin-left: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 280px;
  margin-bottom: 24px;
`;

const MoneyBtn = styled.button`
  height: 52px;

  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--main1, #ffda49);
  font-size: 16px;
  font-family: "KBFGDisplayM";
  margin: 0;
  border: 0;
`;
