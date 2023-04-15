import { User } from "../modules/userclass";
import {getAllUsers, postStatus, deleteUser} from "../modules/firebase";
import { displayMyInfo, createPostGUI, displayUserCard } from "../modules/creategui";
import { logOutBtn, feedBtn, logOut, userloggedin } from "../modules/globals";
import moment from 'moment';

if (userloggedin) {
  displayMyInfo();
  displayUserCard(userloggedin);
  displayMyPosts();
} else {
  location.assign("../index.html");
}

// hämtar ens statusuppdateringar från firebase
async function displayMyPosts(): Promise<void> {
  const myPosts = document.querySelector("#my-posts") as HTMLDivElement;
  myPosts.innerHTML = "";
  const users: User[] = await getAllUsers();
  users.forEach(user => {
    // hittar den användaren vars namn stämmer överens med inloggade användarens namn
    if (user && user.username === userloggedin) {
      // skapar element för att visa statusarna i omvänd ordning (senaste först)
      user.posts.reverse().forEach((post) => {
        createPostGUI(post,user,myPosts);
      });
    }
  });
}

// Skriva ny statusuppdatering
const newPostForm: HTMLFormElement | null = document.querySelector("#newPostForm");

if (newPostForm) {
  newPostForm.addEventListener("submit",async (event) => {
    event.preventDefault();
    const newPost: string = (document.querySelector("#new-post") as HTMLInputElement).value;
    
    //statusobjektet som ska skickas in i databasen
    const postObj = {
      message: newPost,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    
    const users: User[] = await getAllUsers();
    users.forEach((user, index) => {
      if (user && user.username === userloggedin) {
        const userIndex = index; // index som den inloggade användaren befinner sig på i databasen
        const postIndex = user.posts.length; // index i posts-arrayen där den nya statusen ska ligga
        postStatus(postObj, userIndex, postIndex).then(displayMyPosts);
      }
    });
  });
}

// ta bort konto (popup):
const deleteAccountBtn = document.getElementById("delete-account") as HTMLButtonElement;
const confirmDeleteBtn = document.getElementById("confirm-delete") as HTMLButtonElement;
const cancelDeleteBtn = document.getElementById("cancel-delete") as HTMLButtonElement;
const confirmDeletePopup = document.getElementById("confirm-delete-popup") as HTMLDivElement;

deleteAccountBtn.addEventListener("click", () => {
  confirmDeletePopup.style.display = "block";
});

cancelDeleteBtn.addEventListener("click", () => {
  confirmDeletePopup.style.display = "none";
});

confirmDeleteBtn.addEventListener("click", async () => {
  const users: User[] = await getAllUsers();
  users.forEach((user, index) => {
    if (user && user.username === userloggedin) {
      deleteUser(index).then(logOut);
    }
  });
  confirmDeletePopup.style.display = "none";
});

logOutBtn.addEventListener("click", () => {
  logOut();
});

feedBtn.addEventListener("click", () => {
  location.assign("./feed.html");
});