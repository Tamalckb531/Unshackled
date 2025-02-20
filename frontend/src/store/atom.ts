import { userForCollaboration } from '@tamaldip/common';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist({
  key: 'userState', 
  storage: typeof window !== "undefined" ? localStorage: undefined,
})

export const userState = atom({
  key: "userState", 
  default: null, 
  effects_UNSTABLE: [persistAtom],
});

export const WebSocketState = atom<WebSocket | null>({
  key: "webSocketState",
  default: null,
})

export const paramState = atom<string | null>({
  key: "paramState",
  default: null,
})

export const newsCount = atom<number>({
  key: "newsCount",
  default: 0,
})
export const collaborationCount = atom<number>({
  key: "collaborationCount",
  default: 0,
})
export const followState = atom<number>({
  key: "followState",
  default: 0,
})
export const followeeState = atom<number>({
  key: "followeeState",
  default: 0,
})

export const collaboratorState = atom<userForCollaboration[] | []>({
  key: "collaboratorsState",
  default: [],
})