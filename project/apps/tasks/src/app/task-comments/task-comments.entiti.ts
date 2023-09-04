import { Comment } from '@project/shared/app-types';

export class TaskCommentEntity implements Comment {
  public commentId: number;
  public text: string;
  public taskId: number;
  public userId: string;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(comment: Comment) {
    this.commentId = comment.commentId;
    this.text = comment.text;
    this.taskId = comment.taskId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }
}
