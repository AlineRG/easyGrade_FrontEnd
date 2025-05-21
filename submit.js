// Maneja la lógica de guardar los datos
export function handleFormSubmit(userData, contactoData) {
  const inputs = document.querySelectorAll("#editProfileForm input");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  const updatedUser = {
    USER_ID: userData.USER_ID,
    USERNAME: document.getElementById("editUsername").value
    // Ya no incluimos EMAIL ni PASSWORD aquí
  };

  const updatedContact = {
    CONTACTO_ID: contactoData.CONTACTO_ID,
    USER_ID: userData.USER_ID,
    LADA_PAIS: parseInt(document.getElementById("editLadaPais").value),
    LADA_LOCAL: parseInt(document.getElementById("editLadaLocal").value),
    TELEFONO: document.getElementById("editTelefono").value,
    TIPO_TELEFONO: document.getElementById("editTipoTelefono").value,
    NUM_EXTERIOR: document.getElementById("editNumExterior").value,
    NUM_INTERIOR: document.getElementById("editNumInterior").value,
    CALLE: document.getElementById("editCalle").value,
    COLONIA: document.getElementById("editColonia").value,
    CIUDAD: document.getElementById("editCiudad").value,
    ENTIDAD: document.getElementById("editEntidad").value,
    PAIS: document.getElementById("editPais").value,
    CODIGO_POSTAL: document.getElementById("editCodigoPostal").value,
    NOMBRE_S: document.getElementById("editNombreS").value,
    APELLIDO_S: document.getElementById("editApellidoS").value
  };

  fetch("http://127.0.0.1:8000/updateUser", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser)
  }).then(res => res.json())
    .then(data => {
      // Solo actualizamos el USERNAME en localStorage
      const stored = JSON.parse(localStorage.getItem("userData")) || {};
      stored.USERNAME = data.USERNAME;
      localStorage.setItem("userData", JSON.stringify(stored));
    });

  fetch("http://127.0.0.1:8000/updateContact", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedContact)
  })
    .then(() => {
      document.getElementById("editMessage").innerHTML = `<p class="text-green-600">Perfil actualizado con éxito</p>`;
      inputs.forEach(input => input.disabled = true);
      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
    })
    .catch(error => {
      console.error("Error al actualizar:", error);
      document.getElementById("editMessage").innerHTML = `<p class="text-red-600">Error al actualizar el perfil</p>`;
    });
}