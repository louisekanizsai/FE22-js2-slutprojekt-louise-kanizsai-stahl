import { User } from "./modules/userclass";
import { postUser, getAllUsers } from "./modules/firebase";
import { userloggedin } from "./modules/globals";
import moment from 'moment';

if (userloggedin) {
  location.assign("../html/feed.html");
}

const createUserForm: HTMLFormElement | null = document.querySelector("#createUserForm");
const loginForm: HTMLFormElement | null = document.querySelector("#loginForm");

if (createUserForm) {
  createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username: string = (document.querySelector("#new-username") as HTMLInputElement).value;
    const password: string = (document.querySelector("#new-password") as HTMLInputElement).value;
    const profilepic: string = (document.querySelector('input[name="profilepic"]:checked') as HTMLInputElement).value;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const userObj = new User(username, password, profilepic, [{ message: "Hej! Det här är min första status.", timestamp: timestamp }]);

    const users: User[] = await getAllUsers();
    const index: number = users.length;
    postUser(userObj, index);
    alert(`Välkommen, ${username}! Nu kan du logga in. :)`);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputUsername: string = (document.querySelector("#username") as HTMLInputElement).value;
    const inputPassword: string = (document.querySelector("#password") as HTMLInputElement).value;

    const users: User[] = await getAllUsers();
    const checked = checkLogin(inputUsername, inputPassword, users);

    if (!checked) {
      alert("Kunde inte hitta användare. Är du säker på att du stavade rätt?");
    }
  });
}

function checkLogin(inputUsername: string, inputPassword: string, users: User[]): boolean {
  let usernameFound: boolean = false;

  users.forEach((databaseUser) => {
    // loop1: hitta om användarnamnet finns
    if (databaseUser && databaseUser.username === inputUsername) {
      usernameFound = true;
      // loop2: jämföra lösenord
      if (databaseUser.password === inputPassword) {
        localStorage.setItem("loggedInUser", inputUsername);
        location.assign("html/feed.html");
      } else {
        alert("Fel lösenord :(");
      }
    }
  });
  return usernameFound;
}
