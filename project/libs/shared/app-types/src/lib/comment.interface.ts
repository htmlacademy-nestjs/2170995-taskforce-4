export interface Comment {
  id?: string;
  text: string;
  taskId: number;
  userId: string;
  createdAt: Date;
}
