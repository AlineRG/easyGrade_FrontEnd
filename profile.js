// lógica para mostrar y editar el perfil
function showProfile(contentBox) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("Cargando perfil con datos:", userData);

  if (!userData) {
      contentBox.innerHTML = `<p class="text-red-600">No hay datos del usuario disponibles. Inicia sesión primero.</p>`;
      return;
  }

  contentBox.innerHTML = generateProfileForm(userData);

  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const inputs = document.querySelectorAll("#editProfileForm input");

  editBtn.addEventListener("click", () => {
      inputs.forEach(input => input.disabled = false);
      editBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
  });

  loadContactData(userData.USER_ID);

  document.getElementById("editProfileForm").addEventListener("submit", function (event) {
      event.preventDefault();
      handleFormSubmit(userData);
  });
}
