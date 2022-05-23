type LocalStorageApiType = {
  getValue: <T>(key: string) => T | null;
  setValue: (key: string, value: any) => void;
  removeValue: (key: string) => void;
};

export const localStorageApi: LocalStorageApiType = {
  getValue(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (!value) return undefined;
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  },
  setValue(key: string, value: any) {
    try {
      const valueString = JSON.stringify(value);
      localStorage.setItem(key, valueString);
    } catch (e) {}
  },
  removeValue(key: string) {
    localStorage.removeItem(key);
  },
};
