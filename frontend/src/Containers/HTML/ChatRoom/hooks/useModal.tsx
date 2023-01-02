import React from 'react';
import { IChatBox, SetStateType } from '../App';
import { useState } from 'react';
import { message } from 'antd';
import styled from 'styled-components';

interface IProps {
    nick_name: string,
    friend: string,
    setFriend: SetStateType<string>,
    chatBoxes: IChatBox[],
    setChatBoxes: SetStateType<IChatBox[]>,
    scrollToBottom(): void,
}

const Text = styled.p`
    color: #ccc;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 7.5px;
`

const useModal = (props: IProps) => {

    const {
        nick_name,
        friend,
        setFriend,
        chatBoxes,
        setChatBoxes,
        scrollToBottom
    } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const defaultChatBox = (friend: string): IChatBox => {
        return ({
            label: <Wrapper>{friend}</Wrapper>,
            children: <Text>Loading...</Text>,
            key: friend,
            unread: false,
        })
    };

    // control chat boxes 
    const createChatBox = (friend: string) => {
        // Open new chat box with friend
        if (chatBoxes.some
            (({ key }) => key === friend)) {
            message.error({ content: 'Chat box already opened!', duration: 0.5 })
            return friend;
        }

        // children will be update later
        setChatBoxes([...chatBoxes, defaultChatBox(friend)]);
        scrollToBottom();

        message.success({ content: 'Chat box created.', duration: 0.5 })

        return friend;
    }

    const removeChatBox = (targetKey: string) => {

        const index = chatBoxes.findIndex
            (({ key }) => key === friend);
        const newChatBoxes = chatBoxes
            .filter(({ key }) =>
                key !== targetKey);
        setChatBoxes(newChatBoxes);
        return (
            friend ?
                friend === targetKey ?
                    index === 0 ?
                        '' : chatBoxes[index - 1].key
                    : friend
                : ''
        )
    }
    const handleEdit = (targetKey: any, action: 'remove' | 'add') => {
        switch (action) {
            case 'remove': {
                setFriend(removeChatBox(targetKey));
                break;
            }
            case 'add': {
                setModalOpen(true);
                break;
            }
        }
    }

    const handleCreate = (name: string) => {
        setFriend(createChatBox(name));
        setModalOpen(false);
    }

    return { modalOpen, setModalOpen, handleEdit, handleCreate };
}

export default useModal;