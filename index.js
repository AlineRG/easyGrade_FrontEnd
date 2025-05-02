document.addEventListener("DOMContentLoaded", function () {
    const contentBox = document.querySelector(".content-box");
    let contactoData = null;

    document.getElementById("link-profile").addEventListener("click", function (event) {
        event.preventDefault();
        showProfile();
    });

    function showProfile() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log("Cargando perfil con datos:", userData);

        if (!userData) {
            contentBox.innerHTML = `<p class="text-red-600">No hay datos del usuario disponibles. Inicia sesión primero.</p>`;
            return;
        }

        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Perfil</h2>
            <form id="editProfileForm" class="space-y-4">
                <div><label class="block font-semibold">Nombre de Usuario:</label><input type="text" id="editUsername" value="${userData.USERNAME}" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Nombre(s):</label><input type="text" id="editNombreS" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Apellido(s):</label><input type="text" id="editApellidoS" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Email:</label><input type="email" id="editEmail" value="${userData.EMAIL}" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Contraseña:</label><input type="password" id="editPassword" value="${userData.PASSWORD}" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Teléfono:</label><input type="text" id="editTelefono" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Lada País:</label><input type="number" id="editLadaPais" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Lada Local:</label><input type="number" id="editLadaLocal" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Tipo Teléfono:</label><input type="text" id="editTipoTelefono" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Calle:</label><input type="text" id="editCalle" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Número Exterior:</label><input type="text" id="editNumExterior" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Número Interior:</label><input type="text" id="editNumInterior" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Colonia:</label><input type="text" id="editColonia" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Ciudad:</label><input type="text" id="editCiudad" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Entidad:</label><input type="text" id="editEntidad" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">País:</label><input type="text" id="editPais" class="w-full p-2 border rounded" disabled></div>
                <div><label class="block font-semibold">Código Postal:</label><input type="text" id="editCodigoPostal" class="w-full p-2 border rounded" disabled></div>

                <div class="flex space-x-4">
                    <button type="button" id="editBtn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</button>
                    <button type="submit" id="saveBtn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hidden">Guardar Cambios</button>
                </div>
            </form>
            <div id="editMessage" class="mt-4"></div>
        `;

        const editBtn = document.getElementById("editBtn");
        const saveBtn = document.getElementById("saveBtn");
        const inputs = document.querySelectorAll("#editProfileForm input");

        editBtn.addEventListener("click", function () {
            inputs.forEach(input => input.disabled = false);
            editBtn.classList.add("hidden");
            saveBtn.classList.remove("hidden");
        });

        fetch(`http://127.0.0.1:8000/contacto/${userData.USER_ID}`)
            .then(res => res.json())
            .then(contact => {
                contactoData = contact;
                document.getElementById("editNombreS").value = contact.NOMBRE_S ?? "";
                document.getElementById("editApellidoS").value = contact.APELLIDO_S ?? "";
                document.getElementById("editTelefono").value = contact.TELEFONO ?? "";
                document.getElementById("editLadaPais").value = contact.LADA_PAIS ?? "";
                document.getElementById("editLadaLocal").value = contact.LADA_LOCAL ?? "";
                document.getElementById("editTipoTelefono").value = contact.TIPO_TELEFONO ?? "";
                document.getElementById("editCalle").value = contact.CALLE ?? "";
                document.getElementById("editNumExterior").value = contact.NUM_EXTERIOR ?? "";
                document.getElementById("editNumInterior").value = contact.NUM_INTERIOR ?? "";
                document.getElementById("editColonia").value = contact.COLONIA ?? "";
                document.getElementById("editCiudad").value = contact.CIUDAD ?? "";
                document.getElementById("editEntidad").value = contact.ENTIDAD ?? "";
                document.getElementById("editPais").value = contact.PAIS ?? "";
                document.getElementById("editCodigoPostal").value = contact.CODIGO_POSTAL ?? "";
            });

        document.getElementById("editProfileForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const updatedUser = {
                USER_ID: userData.USER_ID,
                USERNAME: document.getElementById("editUsername").value,
                EMAIL: document.getElementById("editEmail").value,
                PASSWORD: document.getElementById("editPassword").value
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
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            }).then(res => res.json())
              .then(data => localStorage.setItem("userData", JSON.stringify(data)));

            fetch("http://127.0.0.1:8000/updateContact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedContact)
            })
                .then(() => {
                    document.getElementById("editMessage").innerHTML = `<p class="text-green-600">✅ Perfil actualizado con éxito</p>`;
                    inputs.forEach(input => input.disabled = true);
                    editBtn.classList.remove("hidden");
                    saveBtn.classList.add("hidden");
                })
                .catch(error => {
                    console.error("Error al actualizar:", error);
                    document.getElementById("editMessage").innerHTML = `<p class="text-red-600">❌ Error al actualizar el perfil</p>`;
                });
        });
    }

    window.logout = function () {
        localStorage.removeItem("userData");
        location.href = "login_register.html";
    };
});
