import ranking from "../../assets/ranking.png";
import { Tabbar } from "../../commons/Tabbar";

export default function Ranking() {
  return (
    <>
      <img src={ranking} style={{ margin: "0 auto", width: "100%" }}></img>
      <Tabbar></Tabbar>
    </>
  );
}
