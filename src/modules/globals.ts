// återkommande variabler/funktioner

// hämtar knappar
export const logOutBtn = document.querySelector(".log-out-btn") as HTMLButtonElement;
export const profileBtn = document.querySelector(".profile-btn") as HTMLButtonElement;
export const feedBtn = document.querySelector(".feed-btn") as HTMLButtonElement;

// logga ut-funktion
export function logOut(): void {
  localStorage.removeItem("loggedInUser");
  location.assign("../index.html");
}

// hämtar inloggad användare
export const userloggedin = localStorage.getItem("loggedInUser") as string;
