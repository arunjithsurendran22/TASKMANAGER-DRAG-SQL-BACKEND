class UserEntity {
  id: number;  
  documentStatus: boolean;
  name: string;
  email: string;
  password: string;
  createdUserId: number | null;  // Foreign key reference
  createdAt: Date;
  updatedUserId: number | null;  // Foreign key reference
  updatedAt: Date;

  constructor(
    id: number,  // Initialize the id
    documentStatus: boolean,
    name: string,
    email: string,
    password: string,
    createdUserId: number | null,
    createdAt: Date,
    updatedUserId: number | null,
    updatedAt: Date
  ) {
    this.id = id;
    this.documentStatus = documentStatus;
    this.name = name;
    this.email = email;
    this.password = password;  // Initialize password
    this.createdUserId = createdUserId;
    this.createdAt = createdAt;
    this.updatedUserId = updatedUserId;
    this.updatedAt = updatedAt;
  }
}

export default UserEntity;
