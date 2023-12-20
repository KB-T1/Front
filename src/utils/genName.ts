export function genName() {
  const feeling = ["행복한", "기쁜", "즐거운", "신난"];
  const color = ["붉은", "파란", "초록", "연두", "노란"];
  const animal = ["고양이", "강아지", "송아지", "양", "병아리"];

  return (
    feeling[Math.floor(Math.random() * feeling.length)] +
    " " +
    color[Math.floor(Math.random() * color.length)] +
    " " +
    animal[Math.floor(Math.random() * animal.length)]
  );
}
