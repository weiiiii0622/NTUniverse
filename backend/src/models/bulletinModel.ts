import { Schema, Types, model } from 'mongoose';

interface IBulletin {
  location: String,
  messages: Types.ObjectId[],
}

/*  BulletinSchema  */
const BulletinSchema = new Schema<IBulletin>({
  location: { type: String },
  messages: [{ type: Schema.Types.ObjectId, ref: 'BulletinMsg' }],
});

const BulletinModel = model<IBulletin>('Bulletin', BulletinSchema);


export default BulletinModel;
