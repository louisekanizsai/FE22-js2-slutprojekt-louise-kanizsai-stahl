import { getAllUsers } from "../modules/firebase";
import { User, Post } from "../modules/userclass";

// OBS OBS 

// Hej Clara! 
//I den här filen får jag ett errormeddelande från vscode varje gång jag skriver import.meta.url (men bara på min laptop, inte när jag sitter hemma med en annan dator). Det här är påminnelsekommentaren du bad mig skriva om att vi pratade om detta på en handledning och du sa att det var okej :)

const userloggedin = localStorage.getItem("loggedInUser");

// funktion som visar info om den inloggade användaren längst upp till höger bredvid navigationsknapparna
export async function displayMyInfo(): Promise<void> {
  const userInfoDiv = document.querySelector(".userinfo") as HTMLParagraphElement;

  const users: User[] = await getAllUsers();
  users.forEach((user) => {
    if (user && user.username === userloggedin) {
      const userNameText: HTMLParagraphElement = document.createElement("p");
      const userProfilePic: HTMLImageElement = document.createElement("img");
      let imgUrl: URL;

      userInfoDiv.append(userNameText, userProfilePic);
      userNameText.innerText = user.username;

      if (user.profilepic == "cat.png") {
        imgUrl = new URL("../images/cat.png", import.meta.url);
      } else if (user.profilepic == "elephant.png") {
        imgUrl = new URL("../images/elephant.png", import.meta.url);
      } else {
        imgUrl = new URL("../images/turtle.png", import.meta.url);
      }
      userProfilePic.src = imgUrl.href;
    }
  });
}

// Funktion som skapar element som innehåller all info om statusen (användarnamn, status, timestamp). Anropas i users.ts, profile.ts och feed.ts
// andra argumentet är userOrPost för att i vissa filer kommer man åt username med user.username och i vissa med post.username. I feed.ts är det inte User utan type aliasen PostInfo (definieras under denna funktion)

export function createPostGUI(post:Post,userOrPost: User | PostInfo, appendTo: HTMLElement): void {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    const userNameAndPic = document.createElement("div");
    userNameAndPic.classList.add("userNameAndPic");

    const userProfilePicElement = document.createElement("img");
    userProfilePicElement.classList.add("profilepic");

    // lägga bilden och användarnamnet i gemensam div. lägg diven i postElement rad 66
    let imgUrl: URL;

    if ("profilepic" in userOrPost && userOrPost.profilepic == "cat.png") {
      imgUrl = new URL("../images/cat.png", import.meta.url);
    } else if ("profilepic" in userOrPost && userOrPost.profilepic == "elephant.png") {
      imgUrl = new URL("../images/elephant.png", import.meta.url);
    } else {
      imgUrl = new URL("../images/turtle.png", import.meta.url);
    }
    userProfilePicElement.src = imgUrl.href;

    const usernameElement = document.createElement("div");
    usernameElement.classList.add("username");
    usernameElement.innerText = userOrPost.username;
        
    userNameAndPic.append(userProfilePicElement,usernameElement);

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerText = post.message;

    const timestampElement = document.createElement("div");
    timestampElement.classList.add("timestamp");
    const date = new Date(post.timestamp);
    timestampElement.innerText = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    postElement.append(userNameAndPic,messageElement, timestampElement);

    appendTo.append(postElement);
}

// typen av objekt som ska in i den array som innehåller all info vi vill skriva ut om varje status. Används i feed.ts (till funktionen ovan, createPostGUI)
export type PostInfo = {
  username: string;
  profilepic: string;
  message: string;
  timestamp: string;
}

// Funktion som visar info om användaren vars profil man är inne på i ett "card"
export async function displayUserCard(clickedOrLoggedinUser:string): Promise<void> {
  const userCard = document.querySelector(".user-card") as HTMLDivElement;
  const usernameh3 = document.querySelector(".user-card h3") as HTMLHeadingElement;
  usernameh3.innerText = clickedOrLoggedinUser;

  const users: User[] = await getAllUsers();
  users.forEach((user) => {
    if(user && user.username === clickedOrLoggedinUser){
      const userProfilePic: HTMLImageElement = document.createElement("img");
      let imgUrl: URL;

      userCard.append(userProfilePic);
      if (user.profilepic == "cat.png") {
        imgUrl = new URL("../images/cat.png", import.meta.url);
      } else if (user.profilepic == "elephant.png") {
        imgUrl = new URL("../images/elephant.png", import.meta.url);
      } else {
        imgUrl = new URL("../images/turtle.png", import.meta.url);
      }
      userProfilePic.src = imgUrl.href;
    }
  });
}