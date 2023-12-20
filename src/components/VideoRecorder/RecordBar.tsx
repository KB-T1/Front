import styled from "styled-components";
import phoneCall from "../../assets/phoneCall.svg";
import sendDollar from "../../assets/sendDollar.svg";
import textMessage from "../../assets/textMessage.svg";
import { P2 } from "../../commons/Text";

interface RecordBarProps {
  call: number;
  message: number;
  send: number;
}

export function RecordBar({ call, message, send }: RecordBarProps) {
  return (
    <RecordBarContainer>
      <ContentWrapper>
        <img src={phoneCall} />
        <P2>{call}회</P2>
      </ContentWrapper>

      <ContentWrapper>
        <img src={textMessage} />
        <P2>{message}회</P2>
      </ContentWrapper>
      <ContentWrapper>
        <img src={sendDollar} />
        <P2>{send}회</P2>
      </ContentWrapper>
    </RecordBarContainer>
  );
}

const RecordBarContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 353px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 20px;
  background: var(--white, #fff);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  padding: 15px 34px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  & > img {
    margin-right: 12px;
  }
`;
