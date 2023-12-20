import styled from "styled-components";
import clipboard from "../assets/clipboard.svg";

interface TextAreaProps {
  value: string;
}

export const TextAreaCodeCreated = ({ value }: TextAreaProps) => {
  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("클립보드에 복사되었습니다.");
      return;
    });
  };

  return (
    <Container>
      <Input value={value} type="text"></Input>
      <img
        src={clipboard}
        onClick={() => {
          handleCopyClipBoard(value);
        }}
        alt="clipboard"
      />
    </Container>
  );
};

const Input = styled.input`
  display: inline-flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  border: none;
  border-bottom: 3px solid var(--gray4, #bababa);
  gap: 10px;
  outline: 0;
  width: 280px;
  /* Display Bold 20 */
  text-align: center;
  font-family: "KBFG Display";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;

  & > img {
    margin-left: 1rem;
  }
`;
