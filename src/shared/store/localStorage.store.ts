class LocalStorage {
  version = "v1-";

  theme = `${this.version}theme`;
  history = `${this.version}history`;

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(key) as T;
  }

  set(key: string, value: string) {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, value);
  }
}

export const localStorageStore = new LocalStorage();
