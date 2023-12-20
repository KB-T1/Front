import React from "react";
import styled from "styled-components";

interface TextAreaProps {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  placeholder: string;
}

export const TextArea2 = ({
  amount,
  setAmount,
  placeholder,
}: TextAreaProps) => {
  return (
    <Input
      value={amount}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(
          Number(
            event.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1")
          )
        );
      }}
      type="text"
      placeholder={placeholder}
    ></Input>
  );
};

const Input = styled.input`
  display: inline-flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 3px solid var(--main1, #ffda49);
  gap: 10px;
  outline: 0;

  width: 132px;
  /* Display Bold 20 */
  text-align: center;
  font-family: "KBFG Display";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
