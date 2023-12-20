import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { H2 } from "../../commons/Text";
import esc from "../../assets/esc.png";
import { TextArea1 } from "../../commons/TextArea1";
import { ButtonYellow } from "../../commons/Button";
import { genName } from "../../utils/genName";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickName: string;
  setNickName: (str: string) => void;
}

export function Modal({ nickName, setNickName, isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <StyledModal isOpen={isOpen} onClick={onClose}>
      <ModalContent ref={modalRef} onClick={handleModalContentClick}>
        <ModalHeader>
          <H2>별명정하기</H2>
          <img src={esc} alt="esc" onClick={onClose} />
        </ModalHeader>
        <TextArea1
          nickName={nickName}
          setNickName={setNickName}
          placeholder="별명을 입력해주세요."
        ></TextArea1>
        <ButtonYellow
          onClick={() => {
            if (!nickName) {
              setNickName(genName());
            } else {
              onClose();
            }
          }}
        >
          확인
        </ButtonYellow>
      </ModalContent>
    </StyledModal>
  );
}

const StyledModal = styled.div<Pick<ModalProps, "isOpen">>`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: -100%;
  ${(props) =>
    props.isOpen &&
    `
    bottom: 40%;
  `};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
  transition: bottom 0.5s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: white;
  height: 40%;
  padding: 20px;
  border-radius: 20px;

  & > button {
    margin-top: 153px;
  }
`;

const ModalHeader = styled.div`
  width: 353px;
  height: 30px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Modal;
