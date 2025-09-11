const API_KEY1 = "30b291671db940319288ebbf6a417f4f";
const API_KEY2 = "a65dc49e0db540c985f6e41ff1865fca";
const API_KEY3 = "763fe25fd3cc4a6cbde68058a651e359";

const API_KEYS = [API_KEY1, API_KEY2, API_KEY3];

export const randomApiKey = () => {
  const randomIndex = Math.floor(Math.random() * API_KEYS.length - 1);
  return API_KEYS[randomIndex];
};
