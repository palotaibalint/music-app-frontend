import SongModel from "./SongModel";

class PlaylistModel {
  id: number;
  name: string;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

export default PlaylistModel;
