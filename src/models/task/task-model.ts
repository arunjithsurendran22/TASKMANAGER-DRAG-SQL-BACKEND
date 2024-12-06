export interface ITask {
  id: number;
  title: string;
  description?: string | null;
  rank?: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}