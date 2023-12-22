import challenge from "../../assets/challenge.png";
import { Tabbar } from "../../commons/Tabbar";

export default function Challenge() {
  return (
    <>
      <img
        onClick={() => {
          alert("추후 개발 예정입니다.");
        }}
        src={challenge}
        style={{ margin: "0 auto", width: "100%" }}
      ></img>
      <Tabbar></Tabbar>
    </>
  );
}
