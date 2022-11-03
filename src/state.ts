import { atom } from "recoil";

export const pageLoadState = atom<boolean>({
  key: "PAGE_LOAD_STATE",
  default: false,
});

export const currentUserIdState = atom<number>({
  key: "CURRENT_USER_ID_STATE",
  default: 1,
});

export const userFavoritesState = atom<{}>({
  key: "USER_FAVORITES_STATE",
  default: {},
});
