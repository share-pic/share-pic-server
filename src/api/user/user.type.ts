export type Code = { code: number };

export type SignUp = Code & {
  isCreated: boolean;
};
export type SignIn = Code & {
  id: string;
  isDelete: boolean;
};
