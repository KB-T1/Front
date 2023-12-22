import calendar from "../../assets/calendar.svg";
import { Tabbar } from "../../commons/Tabbar";

export default function Calendar() {
  return (
    <>
      <img
        onClick={() => {
          alert("추후 개발 예정입니다.");
        }}
        src={calendar}
        style={{ margin: "0 auto", width: "100%" }}
      ></img>
      <Tabbar></Tabbar>
    </>
  );
}
