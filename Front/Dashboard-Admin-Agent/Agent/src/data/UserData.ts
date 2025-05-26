import { HouseData } from "./HouseData";

export interface UserData {
  id?: string;
  role: string;
  name: string;
  email: string | "";
  phone: string;
  status?: string;
  password?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}



export type UserDataOptional = Partial<UserData> & {
  currentPassword?: string;
  newPassword?: string;
};


export interface UserAgentInfoDialogProps {
  user: {
    id?: string;
    role: string;
    name: string;
    email: string;
    phone: string;
    status?: string | "";
  } | null;
  isOpen: boolean;
  onClose: () => void;
}