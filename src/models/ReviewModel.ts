class ReviewModel {
    id: number;
    userEmail: string;
    userName: string;
    date: Date;
    rating: number;
    song_id: number;
    reviewTitle: string;
    reviewDescription?: string;

    constructor(id: number, userEmail: string, userName: string, date: Date, rating: number, song_id: number, reviewTitle: string, reviewDescription?: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.date = date;
        this.rating = rating;
        this.song_id = song_id;
        this.reviewTitle = reviewTitle;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewModel;
