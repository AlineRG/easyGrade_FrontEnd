export function showPrivacidad(contentBox) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    contentBox.innerHTML = `<p class="text-red-600">No hay datos disponibles. Inicia sesión primero.</p>`;
    return;
  }

  contentBox.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Privacidad</h2>
    <form id="privacidadForm" class="space-y-4">
      <div>
        <label class="block font-semibold">Correo electrónico:</label>
        <input type="email" id="privacyEmail" value="${userData.EMAIL}" class="w-full p-2 border rounded" disabled>
      </div>
      <div>
        <label class="block font-semibold">Contraseña:</label>
        <input type="password" id="privacyPassword" value="${userData.PASSWORD}" class="w-full p-2 border rounded" disabled>
      </div>
      <div class="flex space-x-4">
        <button type="button" id="editPrivacyBtn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</button>
        <button type="submit" id="savePrivacyBtn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hidden">Guardar Cambios</button>
      </div>
    </form>
    <div id="privacyMessage" class="mt-4"></div>
  `;

  const editBtn = document.getElementById("editPrivacyBtn");
  const saveBtn = document.getElementById("savePrivacyBtn");
  const inputs = document.querySelectorAll("#privacidadForm input");

  editBtn.addEventListener("click", () => {
    inputs.forEach(input => input.disabled = false);
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
  });

  document.getElementById("privacidadForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedUser = {
      USER_ID: userData.USER_ID,
      USERNAME: userData.USERNAME, // lo conservamos igual
      EMAIL: document.getElementById("privacyEmail").value,
      PASSWORD: document.getElementById("privacyPassword").value
    };

    fetch("http://127.0.0.1:8000/updateUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("userData", JSON.stringify(data));
        document.getElementById("privacyMessage").innerHTML = `<p class="text-green-600">Datos actualizados con éxito</p>`;
        inputs.forEach(input => input.disabled = true);
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
      })
      .catch(err => {
        console.error("Error:", err);
        document.getElementById("privacyMessage").innerHTML = `<p class="text-red-600">Error al actualizar</p>`;
      });
  });
}
