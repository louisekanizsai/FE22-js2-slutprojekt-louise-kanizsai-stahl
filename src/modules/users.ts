import { User } from "../modules/userclass";
import { getAllUsers } from "../modules/firebase";
import { displayMyInfo,createPostGUI, displayUserCard } from "../modules/creategui";
import { logOutBtn, feedBtn, profileBtn, logOut, userloggedin } from "../modules/globals";

const searchString = location.search;
const params = new URLSearchParams(searchString);
const clickedUser = params.get("name") as string;

// om man klickat på sitt eget användarnamn i listan på användare: omdirigeras till egen profil
if (clickedUser == userloggedin) {
  location.assign("./profile.html");
} else {
  displayMyInfo();
  displayUserCard(clickedUser);
  displayUserPosts();
}

const profileOwnerH1 = document.querySelector("#clicked-user-name") as HTMLElement;
if (profileOwnerH1) {
  profileOwnerH1.innerText = `${clickedUser}s profil`;
} 

async function displayUserPosts(): Promise<void> {
  const clickedUserPosts = document.querySelector("#clicked-user-posts") as HTMLDivElement;
  clickedUserPosts.innerHTML = "";

  const users: User[] = await getAllUsers();
  users.forEach(user => {
    if (user && user.username === clickedUser) {
      // visar statusarna i omvänd ordning (senaste först)
      user.posts.reverse().forEach(post => {
          createPostGUI(post,user,clickedUserPosts);
      });
    }
  });
}

logOutBtn.addEventListener("click", () => {
  logOut();
});

feedBtn.addEventListener("click", () => {
  location.assign("./feed.html");
});

profileBtn.addEventListener("click", () => {
  location.assign("./profile.html");
});