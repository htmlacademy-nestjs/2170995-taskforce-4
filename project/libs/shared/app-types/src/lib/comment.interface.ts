export interface Comment {
  commentId?: number;
  text: string;
  taskId: number;
  userId: string;
  createdAt?: Date;
}
