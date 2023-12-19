import UserModel from "./UserModel";

class SongModel{
    title: string;
    artist: string;
    album?: string;
    genres: string[];
    duration: string;
    link?: string;
    img?: string;
    id: number;
    clicks: number;
    owner?: string;

    constructor(title: string,artist: string,album: string,genres: string[],genre: string,duration: string,img: string,clicks: number,link: string,id: number,owner: string){
        this.title=title;
        this.album=album;
        this.artist=artist;
        this.genres=genres;
        this.duration=duration;
        this.img=img;
        this.clicks=clicks;
        this.id=id;
        this.link=link;
        this.owner=owner;
    }
}

export default SongModel;