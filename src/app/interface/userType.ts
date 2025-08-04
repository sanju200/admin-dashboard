export interface UserType {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address?: string;
  dob?: string;
  status: string;
  role: string
}

export interface UserLogin {
  username: string;
  password: string;
}