import lamu from "../assets/profilePicLamu.svg";
import algu from "../assets/profilePicAlgu.svg";
import kiki from "../assets/profilePicKiki.svg";
import coli from "../assets/profilePicColi.svg";
import bibi from "../assets/profilePicBibi.svg";

export function profileMatcher(str: string) {
  if (str === "lamu") {
    return lamu;
  } else if (str === "algu") {
    return algu;
  } else if (str === "kiki") {
    return kiki;
  } else if (str === "coli") {
    return coli;
  } else if (str === "bibi") {
    return bibi;
  }
}
