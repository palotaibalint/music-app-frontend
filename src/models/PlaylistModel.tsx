import SongModel from "./SongModel";

class PlaylistModel {
  id: number;
  name: string;
  username: string;
  songs: SongModel[] | undefined;

  constructor(name: string, id: number, songs: SongModel[], username: string) {
    this.name = name;
    this.id = id;
    this.songs = songs;
    this.username = username;
  }
}

export default PlaylistModel;
