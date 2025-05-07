document.addEventListener("DOMContentLoaded", function () {
  const contentBox = document.querySelector(".content-box");
  let contactoData = null;

  document.getElementById("link-profile").addEventListener("click", function (event) {
      event.preventDefault();
      showProfile(contentBox);
  });

  window.logout = function () {
      localStorage.removeItem("userData");
      location.href = "login_register.html";
  };
});
