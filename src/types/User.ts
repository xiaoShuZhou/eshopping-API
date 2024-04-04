export type User = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
};

export type Payload = {
  email: string;
  _id: string;
};