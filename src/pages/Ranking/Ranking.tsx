import ranking from "../../assets/ranking.png";
import { Tabbar } from "../../commons/Tabbar";

export default function Ranking() {
  return (
    <>
      <img
        onClick={() => {
          alert("추후 개발 예정입니다.");
        }}
        src={ranking}
        style={{ margin: "0 auto", width: "100%" }}
      ></img>
      <Tabbar></Tabbar>
    </>
  );
}
