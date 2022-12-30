import { Schema, Types, model } from 'mongoose';

interface IUser {
  //id: String,
  email: String,
  first_name: String,
  last_name: String,
  nick_name: String,
  picture: String,
  description: String,
}

const UserSchema = new Schema<IUser>({
  //id: String,
  email: String,
  first_name: String,
  last_name: String,
  nick_name: String,
  picture: String,
  description: String,
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
