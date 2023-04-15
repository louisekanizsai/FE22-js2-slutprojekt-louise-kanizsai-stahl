import { User } from "../modules/userclass";
import { getAllUsers } from "./firebase";
import { displayMyInfo, createPostGUI, PostInfo } from "./creategui";
import { logOutBtn, profileBtn, logOut, userloggedin } from "../modules/globals";
import moment from 'moment';

if (userloggedin) {
  displayMyInfo();
  displayAllUsers();
  displayFeed();
} else {
  location.assign("../index.html");
}

// skapar en länk till varje användare
function createUserLink(user: User): HTMLAnchorElement {
  const userLink = document.createElement("a");
  userLink.innerText = user.username;
  userLink.addEventListener("click", () => {
    const profileUrl = new URL("./users.html", window.location.href);
    profileUrl.searchParams.set("name", user.username);
    location.assign(profileUrl.href);
  });
  return userLink;
}

// skriver ut varje användare
async function displayAllUsers(): Promise<void> {
  const allUsersDiv = document.querySelector(".all-users") as HTMLDivElement;
  const users: User[] = await getAllUsers();
  users.forEach((user) => {
    if (user) {
      allUsersDiv.append(createUserLink(user));
    }
  });
}

// visar alla användares statusar (senast först)
async function displayFeed(): Promise<void> {
  const feedContainer = document.querySelector(".feed") as HTMLDivElement;
  // arrayen som ska innehålla objekt med all info vi vill skriva ut om varje status
  const allPosts: PostInfo[] = [];
  const users: User[] = await getAllUsers();

  users.forEach((user) => {
    if (user) {
      const username = user.username;
      const profilepic = user.profilepic;

      user.posts.forEach((post) => {
        const message = post.message;
        const timestamp = post.timestamp;
        allPosts.push({ username, profilepic, message, timestamp });
      });
    }
  });
  // sorterar alla statusar efter när de skrevs
  
  allPosts.sort(
    // (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    (a, b) => moment(b.timestamp, 'YYYY-MM-DD HH:mm:ss').diff(moment(a.timestamp, 'YYYY-MM-DD HH:mm:ss'))
  );

  // skapar element med all info för varje status
  allPosts.forEach((post) => {
    createPostGUI(post, post, feedContainer);
  });
}

logOutBtn.addEventListener("click", () => {
  logOut();
});

profileBtn.addEventListener("click", () => {
  location.assign("./profile.html");
});
