document.addEventListener("DOMContentLoaded", function () {
    const contentBox = document.querySelector(".content-box");

    // Navegación: Perfil
    document.getElementById("link-profile").addEventListener("click", function (event) {
        event.preventDefault();
        showProfile();
    });

    // Función para mostrar y editar perfil
    function showProfile() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log("Cargando perfil con datos:", userData); // para depuración

        if (!userData) {
            contentBox.innerHTML = `<p class="text-red-600">No hay datos del usuario disponibles. Inicia sesión primero.</p>`;
            return;
        }

        // Limpiar contenido anterior
        contentBox.innerHTML = "";

        // Mostrar formulario con campos deshabilitados
        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Perfil</h2>
            <form id="editProfileForm" class="space-y-4">
                <div>
                    <label class="block font-semibold">Nombre de Usuario:</label>
                    <input type="text" id="editUsername" value="${userData.USERNAME}" class="w-full p-2 border rounded" disabled>
                </div>
                <div>
                    <label class="block font-semibold">Email:</label>
                    <input type="email" id="editEmail" value="${userData.EMAIL}" class="w-full p-2 border rounded" disabled>
                </div>
                <div>
                    <label class="block font-semibold">Contraseña:</label>
                    <input type="password" id="editPassword" value="${userData.PASSWORD}" class="w-full p-2 border rounded" disabled>
                </div>
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

        // Habilitar edición
        editBtn.addEventListener("click", function () {
            inputs.forEach(input => input.disabled = false);
            editBtn.classList.add("hidden");
            saveBtn.classList.remove("hidden");
        });

        // Guardar cambios
        document.getElementById("editProfileForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const updatedUser = {
                USER_ID: userData.USER_ID,
                USERNAME: document.getElementById("editUsername").value,
                EMAIL: document.getElementById("editEmail").value,
                PASSWORD: document.getElementById("editPassword").value
            };

            fetch("http://127.0.0.1:8000/updateUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("userData", JSON.stringify(data));
                document.getElementById("editMessage").innerHTML = `<p class="text-green-600">✅ Perfil actualizado con éxito</p>`;
                
                // Deshabilitar campos otra vez
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

    // Función para cerrar sesión
    window.logout = function () {
        localStorage.removeItem("userData");
        location.href = "login_register.html";
    };
});
