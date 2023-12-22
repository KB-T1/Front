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
  "http://kbt1-ollilove-transfer-api.165.192.105.60.nip.io/transfer-api/";
const historyUrl =
  "http://kbt1-ollilove-transfer-api.165.192.105.60.nip.io/transfer-api/history";
const accountUrl =
  "http://kbt1-ollilove-transfer-api.165.192.105.60.nip.io/transfer-api/account/";

// **** GET/POST 맞는지 확인
// **** 파라미터 확인
// **** 변수명 확인

// 별명 정하기
interface RelationCondition {
  targeterId: number;
  targetedId: number;
  nickname: string;
}

interface RelationParams {
  queryKey: [string, { info: RelationCondition }];
}

async function postRelationfunc(params: RelationParams) {
  const [, { info }] = params.queryKey;
  const response = await axios.post(`${baseUrl}relation`, {
    ...info,
  });
  if (response.status == 200) {
    const data = response.data;
    console.log(data);

    return data;
  } else {
    throw new Error("Problem fetching data");
  }
}

export const useRelation = (conditions: RelationCondition) => {
  return useMutation<User, Error>(
    ["relation", conditions],
    () => postRelationfunc({ queryKey: ["signup", { info: conditions }] }),
    {
      onSuccess: () => {
        console.log(
          "성공",
          conditions.nickname,
          conditions.targetedId,
          conditions.targeterId
        );
      },
      onError: (e) => {
        console.log(e);
        alert("에러");
      },
    }
  );
};

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
    const data = response.data;
    console.log(data);

    localStorage.setItem("userId", "2");
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
  const user = response.data;

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

  const response = await axios.get(
    `${baseUrl}family/user/${localStorageUserId}`
  );

  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const familyInfoList = response.data.data.familyMember;

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

  const response = await axios.get(historyUrl, {
    params: {
      userId: localStorageUserId,
      count: 10,
    },
  });

  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const TransferList = response.data.data;

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
  const response = await axios.get(accountUrl + `my`, {
    params: {
      userId: localStorageUserId,
    },
  });
  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const account = response.data.data;

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
      targetUserId: params.queryKey[1].info.targetUserId
        ? params.queryKey[1].info.targetUserId
        : 2,
      userId: localStorageUserId,
      count: 10,
    },
  });
  if (response.status !== 200) {
    throw new Error("Problem fetching data");
  }
  const TransferList = response.data.data;

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
  amount: number;
  senderId: number;
  receiverId: number;
  transferId: number;
  video: Blob;
}

interface UploadVideoParams {
  queryKey: [string, { info: UploadVideoCondition }];
}

async function uploadVideo(params: UploadVideoParams) {
  const [, { info }] = params.queryKey;

  try {
    const formData = new FormData();
    const vdo = new Blob([JSON.stringify(info.video)], {
      type: "application/json",
    });

    formData.append("video", info.video, "video.mp4");
    formData.append("amount", String(info.amount));
    formData.append("senderId", String(info.senderId));
    formData.append("receiverId", String(info.receiverId));
    formData.append("transferId", String(info.transferId));

    console.log("formData", formData, info);
    const response = await axios.post(transferUrl + `transfer/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw new Error("Problem fetching data");
    }
    const videoUrl = response.data.data;

    return videoUrl;
  } catch (e) {
    throw new Error("form-data error");
  }
}

export const useUploadVideo = (conditions: UploadVideoCondition) => {
  return useMutation<String, Error>(["uploadVideo", conditions], () =>
    uploadVideo({
      queryKey: ["uploadVideo", { info: conditions }],
    })
  );
};
