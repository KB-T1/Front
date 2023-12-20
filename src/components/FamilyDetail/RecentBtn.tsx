import styled from "styled-components";
import profileBibi from "../../assets/profilePicBibi.svg";
import { P2, Comment2 } from "../../commons/Text";
import heartImg from "../../assets/heart.svg";

interface RecentBtnProps {
  profile: string;
  name: string;
  relationship: string;
  amount?: number;
  heart?: boolean;
  time: string;
  onClickTransfer: () => void;
}

export function RecentBtn({
  profile,
  name,
  relationship,
  heart,
  amount,
  time,
  onClickTransfer,
}: RecentBtnProps) {
  return (
    <RecentBtnContainer onClick={onClickTransfer}>
      <div>
        <img src={profileBibi} />
        <div>
          <P2>
            {name}({relationship}){amount && amount > 0 ? "에게" : "로부터"}
          </P2>
          <Comment2>{time}</Comment2>
        </div>
      </div>
      {amount && (
        <P2 className={amount > 0 ? "send" : "receive"}>
          {Math.abs(amount).toLocaleString()}원
        </P2>
      )}
      {heart === true && <img src={heartImg} />}
    </RecentBtnContainer>
  );
}

const RecentBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  width: 353px;
  height: 80px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  background: var(--white, #fff);
  margin-bottom: 12px;
  border-radius: 20px;

  .send {
    color: #f06687;
  }

  .receive {
    color: #1f9f7d;
  }

  & > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    & p {
      margin-left: 12px;
    }
  }
`;
