export type IUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: "ADMIN" | "USER";
};
export enum ENUM_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}
