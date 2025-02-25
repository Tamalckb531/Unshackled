import { WebSocketState } from "@/store/atom";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

interface notification{
    sender: string,
    senderImg: string,
    newsId: string,
    topic:string
}

const useNotification = () => {
    const websocketConnection = useRecoilValue(WebSocketState);
    const ws = useRef<WebSocket | null>(websocketConnection);
    
    const sentNotification = ({ sender,senderImg,newsId,topic}:notification) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(
                JSON.stringify({
                    type: "send_notification",
                    sender,
                    senderImg,
                    newsId,
                    topic
                })
            )
        }
    }
  
    return sentNotification;
}

export default useNotification