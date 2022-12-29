import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql" ;
import { User } from "./User";
import { Message } from "./Message";

@Entity()
@ObjectType()
export class ChatRoom {

    // @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    // @Field()
    @Column()
    chatRoomName: string;

    // @Field()
    @Column(type => User)
    users: User[];

    @Column(type => Message)
    messages: Message[];

};
