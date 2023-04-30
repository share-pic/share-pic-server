export type Message = { message: string };
export type signIn = Message & {
  id: string;
  isDelete: boolean;
};
