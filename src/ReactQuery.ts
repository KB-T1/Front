import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { User } from "./types/user";
import { FamilyMember } from "./types/familyMember";
import { TransferInfo } from "./types/transferInfo";
import { Account } from "./types/account";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://kbt1-ollilove-user-api.165.192.105.60.nip.io/api/";
const userUrl = "http://kbt1-ollilove-user-api.165.192.105.60.nip.io/api/user/";
const transferUrl =
  "http://kbt1-ollilove-transfer-api.165.192.105.60.nip.io/api/transfer-api/";
const historyUrl =
  "http://kbt1-ollilove-transfer-api.165.192.105.60.nip.io/api/transfer-api/history";
const accountUrl =
  "http://kbt1-ollilove-transfer-api.165.192.105.60.nip.io/api/transfer-api/account/";

// **** GET/POST 맞는지 확인
// **** 파라미터 확인
// **** 변수명 확인

// 회원가입 관련 query
interface SignUpCondition {
  userName: string;
  profile: string;
  familyId: string;
}

interface UserParams {
  queryKey: [string, { info: SignUpCondition }];
}

async function signUpfunc(params: UserParams) {
  const [, { info }] = params.queryKey;
  const response = await axios.post(`${userUrl}signup`, {
    ...info,
  });
  if (response.status == 200) {
    const data = await response.data;
    console.log(data);

    localStorage.setItem("userId", data.data.userId);
    localStorage.setItem("userName", data.data.userName);
    localStorage.setItem("profile", data.data.profile);
    localStorage.setItem("familyId", info.familyId.toString());
    return data;
  } else {
    throw new Error("Problem fetching data");
  }
}

export const useSignUp = (conditions: SignUpCondition) => {
  const navigate = useNavigate();
  return useMutation<User, Error>(
    ["signup", conditions],
    () => signUpfunc({ queryKey: ["signup", { info: conditions }] }),
    {
      onSuccess: () => {
        alert("회원가입 성공");
        navigate("/home");
      },
      onError: (e) => {
        console.log(e);
        alert("회원가입 에러");
      },
    }
  );
};

// 유저 정보 받아오기 관련 query
interface GetUserInfoCondition {
  userId: number;
}

interface GetUserParams {
  queryKey: [string, {}];
}

async function getUser(params: GetUserParams) {
  const [, {}] = params.queryKey;

  const localStorageUserId = localStorage.getItem("userId");
  if (!localStorageUserId) {
    throw new Error("user id not exist");
  }

  const response = await axios.get(`${userUrl}${localStorageUserId}`);
  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const user = await response.data.json();

  return user;
}

export const useGetUser = (conditions: GetUserInfoCondition) => {
  return useQuery<User, Error>(["getUser", conditions], () =>
    getUser({ queryKey: ["getUser", { info: conditions }] })
  );
};

//FamilyInfo 가져오기 관련 query
interface GetFamilyInfoCondition {
  userId: number;
}

interface FamilyInfoParams {
  queryKey: [string, {}];
}

async function getFamily(params: FamilyInfoParams) {
  const [, {}] = params.queryKey;

  const localStorageUserId = localStorage.getItem("userId");

  if (!localStorageUserId) {
    throw new Error("user id not exist");
  }

  const response = await axios.get(`${baseUrl}/family/user/${localStorageUserId}`);

  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const familyInfoList = await response.data.json();

  return familyInfoList;
}

export const useGetFamilyInfo = (conditions: {}) => {
  return useQuery<FamilyMember[], Error>(["getFamily", conditions], () =>
    getFamily({ queryKey: ["getFamily", {}] })
  );
};

// 송금 전체 내역 관련 query

interface TransferAllParams {
  queryKey: [string, {}];
}

async function getTransferAll(params: TransferAllParams) {
  const [, {}] = params.queryKey;

  const localStorageUserId = localStorage.getItem("userId");

  if (!localStorageUserId) {
    throw new Error("user id not exist");
  }

  const response = await axios.post(historyUrl, {
    userId: localStorageUserId,
    count: 10,
  });

  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const TransferList = await response.data.json();

  return TransferList;
}

export const useGetTransferAll = (conditions: {}) => {
  return useQuery<TransferInfo[], Error>(["getTransferAll", conditions], () =>
    getTransferAll({ queryKey: ["getTransferAll", { info: conditions }] })
  );
};

// 계좌 정보 받아오기 관련 query
interface GetAccountInfoCondition {
  userId: number;
}

interface GetAccountParams {
  queryKey: [string, {}];
}

async function getAccount(params: GetAccountParams) {
  const [, {}] = params.queryKey;

  const localStorageUserId = localStorage.getItem("userId");
  if (!localStorageUserId) {
    throw new Error("user id not exist");
  }
  const response = await axios.get(accountUrl + `my`);
  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const account = await response.data.json();

  return account;
}

export const useGetAccount = (conditions: GetAccountInfoCondition) => {
  return useQuery<Account, Error>(["getAccount", conditions], () =>
    getAccount({ queryKey: ["getAccount", { info: conditions }] })
  );
};

// 송금 개인 간 내역 관련 query

interface GetTransferPersonalCondition {
  targetUserId: number;
}

interface TransferPersonalParams {
  queryKey: [string, { info: GetTransferPersonalCondition }];
}

async function getTransferPersonal(params: TransferPersonalParams) {
  const [, { info }] = params.queryKey;

  const localStorageUserId = localStorage.getItem("userId");

  if (!localStorageUserId) {
    throw new Error("user id not exist");
  }
  const response = await axios.get(historyUrl + `/with`, {
    params: {
      targetUserId: params.queryKey[1].info.targetUserId,
      userId: localStorageUserId,
      count: 10,
    },
  });
  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const TransferList = await response.data.json();

  return TransferList;
}

export const useGetTransferPersonal = (
  conditions: GetTransferPersonalCondition
) => {
  return useQuery<TransferInfo[], Error>(
    ["getTransferPersonal", conditions],
    () =>
      getTransferPersonal({
        queryKey: ["getTransferPersonal", { info: conditions }],
      })
  );
};

// 비디오 업로드 query

interface UploadVideoCondition {
  senderId: number;
  receiverId: number;
  video: Blob;
}

interface UploadVideoParams {
  queryKey: [string, { info: UploadVideoCondition }];
}

async function uploadVideo(params: UploadVideoParams) {
  const [, { info }] = params.queryKey;

  try{
    const formData = new FormData();
    formData.append('video', info.video, 'video.webm')
    formData.append('senderId', String(info.senderId));
    formData.append('receiverId', String(info.receiverId));
    const response = await axios.post(historyUrl + `/with`, formData, { headers: {
      'Content-Type' : 'multipart/form-data',
  },}
  );

    if (response.status !== 200) {
      throw new Error("Problem fetching data");
    }
    const videoUrl = await response.data.json();

    return videoUrl;
  }
  catch (e){
    throw new Error("form-data error");
  }
}

export const useUploadVideo = (
  conditions: UploadVideoCondition
) => {
  return useQuery<String, Error>(
    ["uploadVideo", conditions],
    () =>
      uploadVideo({
        queryKey: ["uploadVideo", { info: conditions }],
      })
  );
};
