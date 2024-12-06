class TaskEntity {
  public id: number; // Auto-incrementing primary key
  public title: string; // Title of the task
  public description?: string; // Description of the task (optional)
  public rank?: number; // Rank of the task (optional)
  public createdUserId: number; // Foreign key to the User who created the task
  public createdAt: Date; // Creation timestamp
  public updatedUserId: number | null; // Foreign key to the User who last updated the task (nullable)
  public updatedAt: Date; // Automatic update timestamp
  public documentStatus: boolean; // Active status of the task

  constructor(
    id: number,
    title: string,
    description: string | undefined,
    rank: number | undefined,
    createdUserId: number,
    createdAt: Date,
    updatedUserId: number | null,
    updatedAt: Date,
    documentStatus: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.rank = rank;
    this.createdUserId = createdUserId;
    this.createdAt = createdAt;
    this.updatedUserId = updatedUserId;
    this.updatedAt = updatedAt;
    this.documentStatus = documentStatus;
  }
}

export default TaskEntity;