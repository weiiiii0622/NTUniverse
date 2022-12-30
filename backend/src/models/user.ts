import { Schema, Types, model } from 'mongoose';

interface IUser {
  id: String,
  name: String,
  email: String,
  picture: String,
}

const UserSchema = new Schema<IUser>({
  id: String,
  name: String,
  email: String,
  picture: String,
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
