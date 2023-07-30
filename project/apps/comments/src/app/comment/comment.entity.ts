import { Comment } from '@project/shared/app-types';

export class CommentEntity implements Comment {
  public _id?: string;
  public text: string;
  public taskId: string;
  public userId: string;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {
      _id: this._id,
      text: this.text,
      taskId: this.taskId,
      userId: this.userId,
      createdAt: this.createdAt,
    }
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.taskId = comment.taskId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }
}
