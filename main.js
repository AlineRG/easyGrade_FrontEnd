import { showProfile } from './profile.js';
import { showPrivacy } from './privacy.js';
import { showMaterias } from './clases.js';

document.addEventListener("DOMContentLoaded", function () {
  const contentBox = document.querySelector(".content-box");

  document.getElementById("link-profile").addEventListener("click", function (event) {
    event.preventDefault();
    showProfile(contentBox);
  });

  window.logout = function () {
    localStorage.removeItem("userData");
    location.href = "login_register.html";
  };
});
