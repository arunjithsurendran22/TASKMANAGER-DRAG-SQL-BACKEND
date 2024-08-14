class UserEntity {
  documentStatus: boolean;
  name: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  fcmTokens: string[];
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;

  constructor(
    documentStatus: boolean,
    name: string,
    email: string,
    countryCode: string,
    mobileNumber: string,
    fcmTokens: string[],
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null,
  ) {
    this.documentStatus = documentStatus;
    this.name = name;
    this.email = email;
    this.countryCode = countryCode;
    this.mobileNumber = mobileNumber;
    this.fcmTokens = fcmTokens;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default UserEntity;
