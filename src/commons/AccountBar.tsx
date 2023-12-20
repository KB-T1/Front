import styled from "styled-components";
import { P2 } from "./Text";
import kb from "../assets/kblogo.svg";

interface AccountBarProps {
  isSelected: number;
  setIsSelected: (num: number) => void;
  val: number;
}

interface AccountBarContainerProps {
  isSelected: number;
  onClick: () => void;
  val: number;
}

export function AccountBar({
  isSelected,
  val,
  setIsSelected,
}: AccountBarProps) {
  return (
    <AccountBarContainer
      onClick={() => {
        setIsSelected(val);
      }}
      isSelected={isSelected}
      val={val}
    >
      <div>
        <P2>KB Wise통장-보통예금</P2>
      </div>
      <div>
        <img src={kb} alt="kb" />
        <P2>KB국민</P2>
        <P2>652301-01-570719</P2>
      </div>
    </AccountBarContainer>
  );
}

const AccountBarContainer = styled.div<AccountBarContainerProps>`
  width: 353px;
  height: 80px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 20px;
  background: var(--white, #fff);

  /* shadow */
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  ${(props) =>
    props.val === props.isSelected
      ? "border: 2px solid var(--main1, #FFDA49);"
      : ""}
  display: flex;
  ${(props) =>
    props.val === props.isSelected ? "background: var(--main4, #FFF4C8);" : ""}

  display: flex;

  flex-direction: column;

  padding-left: 24px;
  padding-top: 15px;

  & > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    align-items: center;
  }
  & > div:last-child {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    align-items: center;

    & > p,
    img {
      margin-right: 12px;
    }
  }
`;
