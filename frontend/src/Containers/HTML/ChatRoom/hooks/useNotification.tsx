import { useSubscription } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { NOTIFICATION_SUBSCRIPTION } from '../../graphql/subscription';
import { IChatBox, IMessage, SetStateType } from '../App';
import { useEffect } from 'react';
import _ from 'lodash';
import Label from '../Label';
import { notification } from 'antd';


interface IProps {
    me: string,
    friends: string[],
    activeKey: string,
    chatBoxes: IChatBox[],
    setChatBoxes: SetStateType<IChatBox[]>,
};

interface INotification {
    from: string,
    to: string,
    message: IMessage,
};

const useNotification = (props: IProps) => {
    const { me, friends, setChatBoxes, activeKey } = props;
    const {
        loading,
        data,
    } = useSubscription(NOTIFICATION_SUBSCRIPTION, { variables: { me, friends } });


    const updateNotification = (prev: IChatBox[]) => {
        const { notification: newNotice } = data;
        const { from, to, message } = newNotice as INotification;

        const friend = me === from ? to : from;

        const newChatBoxes = _.cloneDeep(prev);
        if (activeKey !== friend) {
            newChatBoxes.forEach(box => {
                if (box.key === friend) {
                    box.label = <Label unread={true} friend={friend} />;
                }
            })
        }

        return newChatBoxes;
    }

    useEffect(() => {
        if (!loading)
            setChatBoxes(updateNotification);
    }, [loading]);

}

export default useNotification;