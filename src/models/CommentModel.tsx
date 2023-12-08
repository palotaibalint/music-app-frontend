class CommentModel {
  id: number;
  userName: string;
  text: string;
  review_id: number;

  constructor(id: number, userName: string, review_id: number, text: string) {
    this.id = id;
    this.userName = userName;
    this.text = text;
    this.review_id = review_id;
  }
}

export default CommentModel;
