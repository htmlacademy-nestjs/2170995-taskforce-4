export interface Comment {
  _id?: string;
  text: string;
  taskId: string;
  userId: string;
  createdAt: Date;
}
