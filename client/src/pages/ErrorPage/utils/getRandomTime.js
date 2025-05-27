const glitchedTime = [
  "12:0_",
  "23:4~",
  "99:99",
  "88:88",
  "13:⧗",
  "----",
  "14:3L",
  "1_:__",
  "25:61",
  "ERROR:TIME_NOT_FOUND",
  "14:32 PM",
  "00:0NaN",
];

export const getRandomTime = () => {
  const randomIndex = Math.floor(Math.random() * glitchedTime.length);
  return glitchedTime[randomIndex];
};
