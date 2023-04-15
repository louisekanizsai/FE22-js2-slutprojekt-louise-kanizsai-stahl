// type alias för hur status-arrayen posts ska se ut
export type Post = {
  message: string;
  timestamp: string;
};

export class User {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public profilepic: string,
    public posts: Post[] = []
  ) {}
}
