import styled from "styled-components";
import { SmileTwoTone } from "@ant-design/icons";
import { IMessage } from "../../../Utils/ChatRoom/IChatRoom";
import { useMyContext } from "../../../Utils/useMyContext";

const StyledMessage = styled.div<{ isMe: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    margin: 1px 2px;
    gap: 5px;

    & div:last-child {
      margin: 0 0px;
      padding: 2px 5px;
      border-radius: 5px;
      border: #eee solid 2px;
      background: #eee;
      color: gray;
      margin: auto 0;
    }
`;

const StyledName = styled.div<{ isMe: boolean }>`
  margin: 0;
  padding-left: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};

  & p {
    margin: 0;
    font-size: 12px;
    color: #74726D;
  }
`;

const Message = (props: IMessage) => {
  const { sender, senderNick, content } = props;
  const { me } = useMyContext();
  const myEmail = me['email'];
  const isMe = sender === myEmail;
  return (
    <>
      {!isMe && <StyledName isMe={isMe}>
        <p>{senderNick}</p>
      </StyledName>}
      <StyledMessage isMe={isMe}>
        {!isMe && <SmileTwoTone style={{ fontSize: '20px' }} />} <div>{content}</div>
      </StyledMessage>
    </>
  );
}

export default Message;