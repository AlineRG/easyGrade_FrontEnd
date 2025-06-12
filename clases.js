export function showMaterias(contentBox) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        contentBox.innerHTML = `<p class="text-red-600">Inicia sesión para ver y agregar materias.</p>`;
        return;
    }

    // Cargar materias desde el backend
    fetch(`http://127.0.0.1:8000/materias/${userData.USER_ID}`)
        .then(response => response.json())
        .then(materias => renderMateriasForm(contentBox, materias))
        .catch(error => {
            console.error("Error cargando materias:", error);
            renderMateriasForm(contentBox, []);
        });
}

function renderMateriasForm(contentBox, materias) {
    contentBox.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">Mis Materias</h2>
        <form id="formMateria" class="space-y-4 mb-6">
            <div>
                <label class="block font-semibold">ID de la materia:</label>
                <input type="text" id="materiaId" class="w-full p-2 border rounded" required>
            </div>
            <div>
                <label class="block font-semibold">Nombre de la materia:</label>
                <input type="text" id="nombreMateria" class="w-full p-2 border rounded" required>
            </div>
            <div>
                <label class="block font-semibold">Nivel:</label>
                <input type="text" id="nivelMateria" class="w-full p-2 border rounded" required>
            </div>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Agregar Materia</button>
        </form>
        <div id="listaMaterias">
            ${materias.map(m => `<p class="mb-2">📘 [ID: ${m.MATERIA_ID}] ${m.NOMBRE} - Nivel: ${m.NIVEL}</p>`).join('')}
        </div>
    `;

    document.getElementById("formMateria").addEventListener("submit", function (e) {
        e.preventDefault();

        const materiaId = document.getElementById("materiaId").value.trim();
        const nombre = document.getElementById("nombreMateria").value.trim();
        const nivel = document.getElementById("nivelMateria").value.trim();

        const userData = JSON.parse(localStorage.getItem("userData"));
        const nuevaMateria = {
            USER_ID: userData.USER_ID,
            MATERIA_ID: materiaId,
            NOMBRE: nombre,
            NIVEL: nivel
        };

        fetch("http://127.0.0.1:8000/agregarMateria", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaMateria)
        })
        .then(res => res.json())
        .then(() => showMaterias(contentBox))
        .catch(error => console.error("Error al agregar materia:", error));
    });
}

