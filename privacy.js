import { generatePrivacyForm } from './formTemplates.js';

export function showPrivacy(contentBox) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    contentBox.innerHTML = `<p class="text-red-600">No hay datos disponibles.</p>`;
    return;
  }

  contentBox.innerHTML = generatePrivacyForm(userData);

  const editBtn = document.getElementById("privacyEditBtn");
  const saveBtn = document.getElementById("privacySaveBtn");
  const emailInput = document.getElementById("privacyEmail");
  const passwordInput = document.getElementById("privacyPassword");

  editBtn.addEventListener("click", () => {
    emailInput.disabled = false;
    passwordInput.disabled = false;
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
  });

  document.getElementById("privacyForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedUser = {
      USER_ID: userData.USER_ID,
      USERNAME: userData.USERNAME,
      EMAIL: emailInput.value,
      PASSWORD: passwordInput.value
    };

    fetch("http://127.0.0.1:8000/updateUser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    }).then(res => res.json())
      .then(data => {
        localStorage.setItem("userData", JSON.stringify(data));
        document.getElementById("privacyMessage").innerHTML = `<p class="text-green-600">Cambios guardados</p>`;
        emailInput.disabled = true;
        passwordInput.disabled = true;
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
      }).catch(err => {
        document.getElementById("privacyMessage").innerHTML = `<p class="text-red-600">Error al guardar</p>`;
      });
  });
}
