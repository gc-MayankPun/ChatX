export const getItem = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : undefined;
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
