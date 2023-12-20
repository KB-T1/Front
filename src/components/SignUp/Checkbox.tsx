import styled from "styled-components";
import React from "react";
import checked from "../../assets/checked.svg";
import unchecked from "../../assets/unchecked.svg";
import { P3 } from "../../commons/Text";
import arrow from "../../assets/arrow.svg";
import { CheckStateType } from "../../pages/SignUp/SignUp";

interface CheckboxProps {
  checkState: CheckStateType;
  setIsChecked: (chk: CheckStateType) => void;
  children: React.ReactNode;
  id: number;
}

export function Checkbox({
  checkState,
  children,
  setIsChecked,
  id,
}: CheckboxProps) {
  const imgSrc = checkState.data[id].isChecked ? checked : unchecked;

  const handleClick = () => {
    checkState.data[id].isChecked = !checkState.data[id].isChecked;
    setIsChecked({ data: [...checkState.data] });
  };

  return (
    <CheckboxContainer>
      <div onClick={handleClick}>
        <img src={imgSrc} alt="checkbox" />
        <P3>{children}</P3>
      </div>
      <img src={arrow} alt="arrow" />
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    display: flex;
    width: 300px;

    & > p {
      margin-left: 20px;
    }
  }
`;
