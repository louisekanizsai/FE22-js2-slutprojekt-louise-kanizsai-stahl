import { User } from "../modules/userclass";

const baseUrl: string = "https://slutprojekt-js2-default-rtdb.europe-west1.firebasedatabase.app/";

export async function postUser(obj: User, index: number): Promise<void> {
  const url = `${baseUrl}${index}.json`;

  const init = {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  await fetch(url, init);
}

export async function getAllUsers():Promise<User[]> {
  const url: string = baseUrl + ".json";

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postStatus(obj: { message: string; timestamp: string }, userindex: number, postindex: number): Promise<void> {
  // userindex: vilken användare det ska postas i. postindex: vilken positition i statusarrayen det ska postas i.
  const url = `${baseUrl}${userindex}/posts/${postindex}.json`;

  const init = {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  await fetch(url, init);
}

export async function deleteUser(userindex: number): Promise<void> {
  const url = `${baseUrl}${userindex}.json`;

  const init = {
    method: "DELETE",
  };
  await fetch(url, init);
}
