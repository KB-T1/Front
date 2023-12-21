import calendar from "../../assets/calendar.svg";
import { Tabbar } from "../../commons/Tabbar";

export default function Calendar() {
  return (
    <>
      <img src={calendar} style={{ margin: "0 auto" }}></img>
      <Tabbar></Tabbar>
    </>
  );
}
