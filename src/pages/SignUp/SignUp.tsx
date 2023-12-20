import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navbar } from "../../commons/Navbar";
import { H1, H2, H4, P3 } from "../../commons/Text";
import { Checkbox } from "../../components/SignUp/Checkbox";
import check from "../../assets/checked.svg";
import uncheck from "../../assets/unchecked.svg";
import { ButtonYellow, ButtonGray } from "../../commons/Button";
import { useNavigate } from "react-router-dom";
import esc from "../../assets/esc.svg";
import { TextAreaName } from "../../commons/TextAreaName";
import { genName } from "../../utils/genName";
import { SelectProfile } from "../../components/SignUp/SelectProfile";
import { profileMatcher } from "../../utils/profileMatcher";
import { AccountBar } from "../../commons/AccountBar";
import { TextAreaCode } from "../../commons/TextAreaCode";
import { TextAreaCodeCreated } from "../../commons/TextAreaCodeCreated";
import { RandomComponent } from "../../utils/GenRandomId";
import family from "../../assets/family.svg";
import { useSignUp } from "../../ReactQuery";

export interface CheckStateType {
  data: { id: number; isChecked: boolean }[];
}

export default function SignUp() {
  const navigate = useNavigate();
  const createdCode = RandomComponent();
  const [name, setName] = useState<string>("");
  const [profile, setProfile] = useState<string>("lamu");
  const [signupStage, setSignupStage] = useState<number>(0);
  const [isSelectedAccount, setIsSelectedAccount] = useState<number>(0);
  const [inviteCode, setInviteCode] = useState<string>("");
  const mutation = useSignUp({
    familyId: inviteCode || createdCode,
    userName: name,
    profile: profile,
  });
  const [checkState, setCheckState] = useState<CheckStateType>({
    data: [
      {
        id: 0,
        isChecked: false,
      },
      {
        id: 1,
        isChecked: false,
      },
      {
        id: 2,
        isChecked: false,
      },
    ],
  });

  const [wholeCheck, setWholeCheck] = useState<boolean>(false);
  const [btnActivate, setBtnActivate] = useState<boolean>(false);
  const [btnActivate2, setBtnActivate2] = useState<boolean>(false);
  const termsAndConditions = [
    {
      id: 0,
      text: (
        <>
          [필수] 개인(신용)정보 수집 이용 동의서 <br />
          (올리사랑 서비스)
        </>
      ),
    },
    {
      id: 1,
      text: (
        <>
          [필수] 개인(신용)정보 제공 동의서 <br />
          (올리사랑 서비스)
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          [필수] 개인(신용)정보 제 3자 제공 동의서 <br />
          (올리사랑 서비스)
        </>
      ),
    },
  ];

  useEffect(() => {
    if (wholeCheck) {
      const state = [...checkState.data];

      state.map((el, i) => {
        el.isChecked = true;
        return el;
      });

      setCheckState({ data: state });
      setBtnActivate(true);
    } else {
      const state = [...checkState.data];

      state.map((el, i) => {
        el.isChecked = false;
        return el;
      });

      setCheckState({ data: state });
      setBtnActivate(false);
    }
  }, [wholeCheck]);

  useEffect(() => {
    for (let i = 0; i < checkState.data.length; i++) {
      if (checkState.data[i].isChecked === false) {
        setBtnActivate(false);
        return;
      }
    }
    setBtnActivate(true);
    setWholeCheck(true);
  }, [checkState]);

  useEffect(() => {
    if (inviteCode.length === 32) {
      setBtnActivate2(true);
    } else {
      setBtnActivate2(false);
    }
  }, [inviteCode]);

  return (
    <SignUpContainer>
      {signupStage < 6 && (
        <Navbar
          onClick={() => {
            if (signupStage > 0) {
              setSignupStage(signupStage - 1);
            } else {
              navigate("/");
            }
          }}
          type="back"
        >
          올리사랑
        </Navbar>
      )}

      {signupStage === 0 && (
        <>
          <Content>
            <H1>서비스 이용동의</H1>

            <CheckboxContainer
              onClick={() => {
                setWholeCheck(!wholeCheck);
              }}
            >
              <img src={wholeCheck ? check : uncheck} alt="whole" />
              <H4>전체 동의</H4>
            </CheckboxContainer>
            <hr />
            {termsAndConditions.map((el, i) => (
              <Checkbox
                checkState={checkState}
                setIsChecked={setCheckState}
                key={i}
                id={i}
              >
                {el.text}
              </Checkbox>
            ))}
          </Content>
          {btnActivate && (
            <ButtonYellow
              onClick={() => {
                setSignupStage(1);
              }}
            >
              확인
            </ButtonYellow>
          )}
          {!btnActivate && <ButtonGray>전체 동의가 필요합니다.</ButtonGray>}
        </>
      )}
      {signupStage === 1 && (
        <>
          <ModalContent>
            <ModalHeader>
              <H2>
                올리사랑에서 사용할
                <br />
                이름을 입력해주세요.
              </H2>
            </ModalHeader>
            <TextAreaName
              value={name}
              setName={setName}
              placeholder="이름을 입력해주세요."
            ></TextAreaName>
            <ButtonYellow
              onClick={() => {
                if (!name) {
                  setName(genName());
                } else {
                  setSignupStage(signupStage + 1);
                }
              }}
            >
              확인
            </ButtonYellow>
          </ModalContent>
        </>
      )}
      {signupStage === 2 && (
        <>
          <ModalContent>
            <ModalHeader>
              <H2>프로필을 선택해주세요.</H2>
            </ModalHeader>
            <SelectedProfile>
              <P3>선택된 프로필</P3>
              <img src={profileMatcher(profile)} alt="profile" width={100} />
            </SelectedProfile>
            <SelectProfile setProfile={setProfile}></SelectProfile>
            <ButtonYellow
              onClick={() => {
                setSignupStage(signupStage + 1);
              }}
            >
              확인
            </ButtonYellow>
          </ModalContent>
        </>
      )}
      {signupStage === 3 && (
        <>
          <ModalContent>
            <ModalHeader>
              <H2>계좌를 선택해주세요.</H2>
            </ModalHeader>
            <AccountBarContainer>
              {[0, 1, 2, 3].map((el, i) => (
                <AccountBar
                  isSelected={isSelectedAccount}
                  setIsSelected={setIsSelectedAccount}
                  val={el}
                  key={el}
                />
              ))}
            </AccountBarContainer>
            <ButtonYellow
              onClick={() => {
                setSignupStage(signupStage + 1);
              }}
            >
              확인
            </ButtonYellow>
          </ModalContent>
        </>
      )}
      {signupStage === 4 && (
        <>
          <ModalContent>
            <ModalHeader>
              <H2>초대코드를 받으셨나요?</H2>
            </ModalHeader>
            <TextAreaCode
              value={inviteCode}
              setName={setInviteCode}
              placeholder="초대코드를 입력해주세요."
            ></TextAreaCode>
            <P3>
              <div
                onClick={() => {
                  setSignupStage(signupStage + 1);
                }}
              >
                초대코드를 만들고 싶어요.
              </div>
            </P3>
            {btnActivate2 && (
              <ButtonYellow
                onClick={() => {
                  setSignupStage(signupStage + 2);
                }}
              >
                가입하기
              </ButtonYellow>
            )}
            {!btnActivate2 && (
              <ButtonGray>초대코드가 유효하지 않아요.</ButtonGray>
            )}
          </ModalContent>
        </>
      )}
      {signupStage === 5 && (
        <>
          <ModalContent>
            <ModalHeader>
              <H2>초대코드를 생성했어요</H2>
            </ModalHeader>
            <TextAreaCodeCreated value={createdCode}></TextAreaCodeCreated>
            <ButtonYellow
              onClick={() => {
                setSignupStage(signupStage + 1);
              }}
            >
              가입하기
            </ButtonYellow>
          </ModalContent>
        </>
      )}
      {signupStage === 6 && (
        <>
          <ModalContent>
            <ModalHeader>
              <H2>올리사랑에 오신 것을 환영해요!</H2>
            </ModalHeader>
            <div className="family">
              <img src={family} alt="family" />
            </div>
            <ButtonYellow
              onClick={() => {
                console.log({
                  familyId: inviteCode || createdCode,
                  userName: name,
                  profile: profile,
                });
                mutation.mutate();
              }}
            >
              시작하기
            </ButtonYellow>
          </ModalContent>
        </>
      )}
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > button {
    position: fixed;
    margin-left: 20px;
    bottom: 41px;
  }
`;

const Content = styled.div`
  display: flex;
  width: 353px;
  flex-direction: column;

  margin-left: 20px;
  margin-top: 36px;

  & > hr {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  & > h1 {
    margin-bottom: 20px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > h4 {
    margin-left: 10px;
  }
`;
const ModalContent = styled.div`
  background-color: white;

  padding: 20px;
  margin-top: 36px;
  border-radius: 20px;

  & > button {
    position: fixed;
    bottom: 41px;
  }

  & > p {
    margin-top: 24px;
    color: #1f9f7d;
  }

  .family {
    width: 100%;
    display: flex;

    & > img {
      margin: 0 auto;
      margin-top: 185px;
    }
  }
`;

const ModalHeader = styled.div`
  width: 353px;
  height: 30px;

  margin-bottom: 3rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SelectedProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin: 0 auto;

  margin-bottom: 4rem;

  & > p {
    margin-bottom: 1rem;
  }

  & > img {
    border-radius: 50%;
    border: 5px solid black;
  }
`;

const AccountBarContainer = styled.div``;
