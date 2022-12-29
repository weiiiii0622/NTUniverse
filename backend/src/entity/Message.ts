import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql" ;
import { User } from "./User";

@Entity()
// @ObjectType()
export class Message {

    // @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    // @Field()
    @Column()
    chatRoomName: string;

    // @Field()
    @Column(type => User)
    users: User[];

}
