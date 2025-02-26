import { WebSocketState } from "@/store/atom";
import { createNotificationType } from "@tamaldip/common";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

interface notification{
    authorId:string,
    sender: string,
    senderImg: string,
    newsId: string,
    topic:string
}

const useNotification = () => {
    const websocketConnection = useRecoilValue(WebSocketState);
    const ws = useRef<WebSocket | null>(websocketConnection);

    const createNotification = async ({ authorId, sender, senderImg, newsId, topic }: notification) => {
        
        const data: createNotificationType = {
            sender,
            senderImg,
            isChecked:false,
            newsId,
            topic
        };
      

        const res = await fetch(
            `http://localhost:3000/api/notification/create/${authorId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            }
          );
  
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.msg||"Failed to send notification");
        }
    }
    
    const sentNotification = (authorId:string) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(
                JSON.stringify({
                    type: "send_notification",
                    authorId,
                })
            )
        }
    }
  
    return {sentNotification, createNotification};
}

export default useNotification