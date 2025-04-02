export const getLocalStorage = (key: string, defaultValue: null) => {
  const stickyValue = window.localStorage.getItem(key);

  if (stickyValue !== null && stickyValue !== undefined) {
    try {
      return JSON.parse(stickyValue);
    } catch (error) {
      console.error(`Error getting localStorage key: ${key}`, error);
      return defaultValue;
    }
  }

  return defaultValue;
};

export const setLocalStorage = (
  key: string,
  value: object | [] | string | boolean
) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key: ${key}`, error);
  }
};
