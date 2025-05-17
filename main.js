// Carga principal y evento DOMContentLoaded
import { showProfile } from './profile.js';
import { showPrivacidad } from './privacidad.js';

document.addEventListener("DOMContentLoaded", function () {
  const contentBox = document.querySelector(".content-box");
  let contactoData = null;

  document.getElementById("link-profile").addEventListener("click", function (event) {
      event.preventDefault();
      showProfile(contentBox);
  });

  document.getElementById("link-privacidad").addEventListener("click", function (event) {
    event.preventDefault();
    showPrivacidad(contentBox);
  });

  window.logout = function () {
      localStorage.removeItem("userData");
      location.href = "login_register.html";
  };
});
