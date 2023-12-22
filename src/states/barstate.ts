import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const barState = atom({
  key: "barState",
  default: "home",
  effects_UNSTABLE: [persistAtom],
});
