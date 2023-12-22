import challenge from "../../assets/challenge.png";
import { Tabbar } from "../../commons/Tabbar";

export default function Challenge() {
  return (
    <>
      <img src={challenge} style={{ margin: "0 auto", width: "100%" }}></img>
      <Tabbar></Tabbar>
    </>
  );
}
