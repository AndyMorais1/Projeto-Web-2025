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
  createdAt?: Date;
  houses?: HouseData[];
}



export type UserDataOptional = Partial<UserData>;

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