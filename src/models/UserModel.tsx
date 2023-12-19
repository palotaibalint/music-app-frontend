import SongModel from "./SongModel";

class UserModel {
  user_id: number;
  username: string;
  email: string;
  songs: SongModel[] | undefined;

  constructor(
    user_id: number,
    username: string,
    email: string,
    songs: SongModel[]
  ) {
    this.username = username;
    this.user_id = user_id;
    this.songs = songs;
    this.email = email;
  }
}

export default UserModel;
