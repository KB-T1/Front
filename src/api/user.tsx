import axios from "axios";
import { AxiosResponse } from "axios";

interface postSignupBody {
  familyId: string;
  userName: string;
  profile: string;
}

export const postSignup = async ({
  familyId,
  userName,
  profile,
}: postSignupBody) => {
  try {
    const res = await axios.post(
      process.env.REACT_PUBLIC_API_USER_SIGNUP + "",
      { familyId: familyId, userName: userName, profile: profile }
    );
    if (res.status === 200) {
      const data = await res.data;
      localStorage.setItem("userId", data.data.userId);
      return data;
    }
    return {};
  } catch (e) {
    console.log(e);
    return {};
  }
};
