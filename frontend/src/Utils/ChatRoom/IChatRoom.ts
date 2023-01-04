export interface IMessage {
  sender: string,
  senderNick: string,
  content: string,
}

export interface IChatRoom {
  name: string,
  // messages: IMessage[],
  // lastMsg: string,
  // children: React.ReactNode,
  // unread: number,
};

export interface INewMsg {
  chatRoomName: string,
  sender: string,
  senderNick: string,
  content: string, 
}