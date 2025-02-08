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