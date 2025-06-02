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
   isSuperAdmin?: boolean;
}



export type UserDataOptional = Partial<UserData> & {
  currentPassword?: string;
  newPassword?: string;
   isSuperAdmin?: boolean;
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