import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql" ;

@Entity()
// @ObjectType()
export class User {

    // @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID

    // @Field()
    @Column()
    name: string

    // @Field()
    @Column()
    picture: string

}
