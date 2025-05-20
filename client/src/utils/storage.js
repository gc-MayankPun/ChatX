export const getItem = (key) => {
  const storedValue = localStorage.getItem(key);
  try {
    return JSON.parse(storedValue);
  } catch (error) {
    return storedValue;
  }
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
