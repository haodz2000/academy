export const catchResponse = async <T>(
  func: () => Promise<T>
): Promise<T | null> => {
  try {
    return await func();
  } catch (e) {
    return null;
  }
};
