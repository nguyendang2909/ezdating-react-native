export declare namespace SocketRequest {
  type SendMessage = {
    matchId: string;
    text: string;
    uuid: string;
  };

  type ReadMessage = {
    matchId: string;
    lastMessageId: string;
  };
}
