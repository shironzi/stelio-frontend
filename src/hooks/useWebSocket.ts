import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import { useUserData } from '../context/UserContext';

export function useWebSocket(subscribeTo: string | null) {
  const [connected, setConnected] = useState(false);
  const [payload, setPayload] = useState<any>(null);
  const clientRef = useRef<Client | null>(null);
  const { userData } = useUserData();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || !userData.id || !subscribeTo) return;

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const socket = new SockJS(`${baseUrl}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      // debug: (str) => {
      //   console.log('STOMP debug:', str);
      // },
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/user/${userData.id}/${subscribeTo}`, (msg: IMessage) => {
          const data = JSON.parse(msg.body);
          setPayload(data);
        });

        // console.log("Connected")
      },
      // onStompError: (frame) => {
      //   console.error('STOMP error', frame);
      // },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      // console.log('WebSocket disconnected');
    };
  }, [userData?.id, subscribeTo]);

  return { connected, payload };
}