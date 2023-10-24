class SongModel{
    id: number;
    title: string;
    artist: string;
    album?: string;
    genre: string;
    duration: number;
    img?: string;

    constructor(id: number,title: string,artist: string,album: string,genre: string,duration: number,img: string){
        this.id=id;
        this.title=title;
        this.album=album;
        this.artist=artist;
        this.genre=genre;
        this.duration=duration;
        this.img=img;
    }
}

export default SongModel;