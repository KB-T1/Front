import { v4 as uuidv4 } from "uuid";

export const RandomComponent = () => {
  const randomId = uuidv4();

  const randomIdWithoutHyphen = randomId.replace(/-/g, "");

  return randomIdWithoutHyphen;
};
