import styled from "styled-components";
import { Tag } from "antd";
import { SmileTwoTone } from "@ant-design/icons";
import React from "react";
import { IChatRoom, IMessage } from "../../../Utils/ChatRoom/IChatRoom";
import { useMyContext } from "../../../Utils/useMyContext";

const StyledMessage = styled.div<{ isMe: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 10px;
    gap: 10px;

    & div:last-child {
        margin: 0 5px;
        padding: 2px 5px;
        border-radius: 5px;
        border: #eee solid 2px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`;

const Message = (props: IMessage) => {
    const { sender, content } = props;
    const { me } = useMyContext();
    const myEmail = me['email'];
    const isMe = sender === myEmail;
    return (
        <StyledMessage isMe={isMe}>
            {!isMe && <SmileTwoTone />}<div>{content}</div>
        </StyledMessage>
    );
}

export default Message;