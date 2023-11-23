class SongModel{
    title: string;
    artist: string;
    album?: string;
    duration: string;
    img?: string;
    id: number;
    clicks: number;

    constructor(title: string,artist: string,album: string,genre: string,duration: string,img: string,clicks: number,id: number){
        this.title=title;
        this.album=album;
        this.artist=artist;
        this.duration=duration;
        this.img=img;
        this.clicks=clicks;
        this.id=id;
    }
}

export default SongModel;