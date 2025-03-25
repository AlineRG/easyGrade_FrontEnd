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
        if (!userData) {
            contentBox.innerHTML = `<p class="text-red-600">No hay datos del usuario disponibles. Inicia sesión primero.</p>`;
            return;
        }

        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Editar Perfil</h2>
            <form id="editProfileForm" class="space-y-4">
                <div>
                    <label class="block font-semibold">Nombre de Usuario:</label>
                    <input type="text" id="editUsername" value="${userData.USERNAME}" class="w-full p-2 border rounded">
                </div>
                <div>
                    <label class="block font-semibold">Email:</label>
                    <input type="email" id="editEmail" value="${userData.EMAIL}" class="w-full p-2 border rounded">
                </div>
                <div>
                    <label class="block font-semibold">Contraseña:</label>
                    <input type="password" id="editPassword" value="${userData.PASSWORD}" class="w-full p-2 border rounded">
                </div>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar Cambios</button>
            </form>
            <div id="editMessage" class="mt-4"></div>
        `;

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
