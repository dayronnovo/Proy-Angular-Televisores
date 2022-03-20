export class Usuario {
  id: number;
  user_name: string;
  email: string;
  password?: string;
  active: boolean;
  roles: string[] = [];
}
