import { Schema, Types, model } from 'mongoose';

interface IBulletinMsg {
  author: Types.ObjectId,
  body: String,
  time: String,
  tags: String[],
}
/*  BulletinMsgSchema  */
const BulletinMsgSchema = new Schema<IBulletinMsg>({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  body: String,
  time: String,
  tags: [String],
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const BulletinMsgModel = model<IBulletinMsg>('BulletinMsg', BulletinMsgSchema);

export default BulletinMsgModel;
