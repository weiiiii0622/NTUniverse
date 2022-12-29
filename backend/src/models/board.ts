import { Schema, Types, model } from 'mongoose';

interface IBoard {
  location: String,
  bulletins: Types.ObjectId,
}

interface IBulletin {
  announcer: Types.ObjectId,
  title: String,
  text: String,
  time: String,
  tags: String[],
}

/*  BoardModel */
const BoardSchema = new Schema<IBoard>({
  location: { type: String },
  bulletins: { types: Schema.Types.ObjectId, ref: 'Bulletin' },
});

const BoardModel = model<IBoard>('Board', BoardSchema);

/*  BulletinSchema */
const BulletinSchema = new Schema<IBulletin>({
  announcer: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
  time: String,
  tags: [String],
});

const BulletinModel = model<IBulletin>('Bulletin', BulletinSchema);

export default { BoardModel, BulletinModel };
