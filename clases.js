export function showMaterias(contentBox) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        contentBox.innerHTML = `<p class="text-red-600">Inicia sesión para ver y agregar materias.</p>`;
        return;
    }

    //Cargar materias del usuario
    async function cargarMaterias() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getMateriasByUserID?user_id=${userData.USER_ID}`);
            if (!response.ok) throw new Error("Error al obtener registros");
            const materias = await response.json();
            return materias.length ? materias : [];
        } catch (error) {
            console.error("Error al cargar materias:", error);
            return [];
        }
    }

    //Cargar todas las materias disponibles
    async function cargarTodasMaterias() {
        try {
            const response = await fetch("http://127.0.0.1:8000/todasMaterias");
            if (!response.ok) throw new Error("Error al cargar todas las materias");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    //Renderizar la lista de materias del usuario
    async function renderMateriasList() {
        const materias = await cargarMaterias();
        const lista = materias.map(materia => `
            <form class="bg-white border rounded p-4 space-y-4 mb-4" data-id="${materia.MATERIA_ID}">
                <div class="flex flex-wrap gap-4 items-end">
                    <div class="flex-1 min-w-[200px]">
                        <label class="block font-semibold mb-1">Nombre:</label>
                        <input type="text" class="nombre-input w-full p-2 border rounded" value="${materia.NOMBRE}" disabled>
                    </div>
                    <div class="flex-1 min-w-[150px]">
                        <label class="block font-semibold mb-1">Nivel:</label>
                        <input type="text" class="nivel-input w-full p-2 border rounded" value="${materia.NIVEL}" disabled>
                    </div>
                </div>
                <div class="flex gap-2 mt-4">
                    <button type="button" class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Editar</button>
                    <button type="button" class="save-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded hidden">Guardar</button>
                    <button type="button" class="cancel-btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded hidden">Cancelar</button>
                    <button type="button" class="delete-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded hidden">Eliminar</button>
                </div>
            </form>
        `).join("");

        document.getElementById("listaMaterias").innerHTML = lista || '<p class="text-gray-500">No tienes materias registradas.</p>';
        configurarEventos();
    }

    //Configurar botones de edición, cancelación y eliminación
    function configurarEventos() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const form = e.target.closest("form");
                form.querySelector(".nombre-input").disabled = false;
                form.querySelector(".nivel-input").disabled = false;
                form.querySelector(".save-btn").classList.remove("hidden");
                form.querySelector(".cancel-btn").classList.remove("hidden");
                form.querySelector(".delete-btn").classList.remove("hidden");
                e.target.classList.add("hidden");
            });
        });

        document.querySelectorAll(".cancel-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                resetForm(e.target.closest("form"));
            });
        });

        document.querySelectorAll(".save-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const form = e.target.closest("form");
                const materiaId = form.getAttribute("data-id");
                const nombre = form.querySelector(".nombre-input").value.trim();
                const nivel = form.querySelector(".nivel-input").value.trim();

                try {
                    const response = await fetch(`http://127.0.0.1:8000/editarMateria/${materiaId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ NOMBRE: nombre, NIVEL: nivel })
                    });
                    if (!response.ok) throw new Error("Error al actualizar");
                    mostrarMensaje("Materia actualizada correctamente", "success");
                    await renderMateriasList();
                } catch (error) {
                    console.error(error);
                    mostrarMensaje("Error al actualizar la materia", "error");
                    resetForm(form);
                }
            });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const form = e.target.closest("form");
                const materiaId = form.getAttribute("data-id");

                if (!confirm("¿Estás seguro que quieres eliminar esta materia?")) return;

                try {
                    const response = await fetch(`http://127.0.0.1:8000/eliminarMateria/${materiaId}`, {
                        method: "DELETE"
                    });
                    if (!response.ok) throw new Error("Error al eliminar la materia");
                    mostrarMensaje("Materia eliminada correctamente", "success");
                    await renderMateriasList();
                } catch (error) {
                    console.error("Error:", error);
                    mostrarMensaje("Error al eliminar la materia", "error");
                }
            });
        });
    }

    function resetForm(form) {
        form.querySelector(".nombre-input").disabled = true;
        form.querySelector(".nivel-input").disabled = true;
        form.querySelector(".save-btn").classList.add("hidden");
        form.querySelector(".cancel-btn").classList.add("hidden");
        form.querySelector(".delete-btn").classList.add("hidden");
        form.querySelector(".edit-btn").classList.remove("hidden");
    }

    function mostrarMensaje(texto, tipo) {
        const mensajeDiv = document.getElementById("mensajeMateria");
        mensajeDiv.innerHTML = `<p class="${tipo === 'success' ? 'text-green-600' : 'text-red-600'}">${texto}</p>`;
        setTimeout(() => mensajeDiv.innerHTML = '', 3000);
    }

    //Agregar materia desde dropdown (Recuadro 1)
    async function agregarMateriaPorId(materiaId, nivel) {
        try {
            const response = await fetch("http://127.0.0.1:8000/updateRegistroMateriasUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ USER_ID: userData.USER_ID, MATERIA_ID: materiaId, NIVEL: nivel })
            });
            if (!response.ok) throw new Error("Error al agregar materia a tus materias");
            mostrarMensaje("Materia agregada a tus materias correctamente", "success");
            await renderMateriasList();
        } catch (error) {
            console.error(error);
            mostrarMensaje(error.message, "error");
        }
    }

    //Registrar nueva materia (Recuadro 2)
    async function registrarMateria(nombre, nivel) {
        try {
            const response = await fetch("http://127.0.0.1:8000/registrarMateria", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ NOMBRE: nombre, NIVEL: nivel })
            });
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.detail);
            }
            const nuevaMateria = await response.json();

            // Relacionar con el usuario
            await fetch("http://127.0.0.1:8000/updateRegistroMateriasUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ USER_ID: userData.USER_ID, MATERIA_ID: nuevaMateria.MATERIA_ID, NIVEL: nivel })
            });

            mostrarMensaje("Materia registrada correctamente", "success");

            // Actualizar dropdown y lista
            await initDropdown();
            await renderMateriasList();

        } catch (error) {
            console.error(error);
            mostrarMensaje(error.message, "error");
        }
    }

    //Inicializar dropdown de Recuadro 1
    async function initDropdown() {
        const todasMaterias = await cargarTodasMaterias();
        const opcionesHTML = todasMaterias.map(m => `<option value="${m.MATERIA_ID}">${m.NOMBRE}</option>`).join("");
        document.getElementById("nombreMateria1").innerHTML = `
            <option value="">Selecciona una materia</option>
            ${opcionesHTML}
        `;
    }

    //Inicialización de la interfaz
    async function init() {
        contentBox.innerHTML = `
            <div>
                <h2 class="text-2xl font-bold mb-6">Agrega Materias a la base de datos</h2>
                
                <!-- RECUADRO 1 -->
                <form id="formMateria1" class="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
                    <h3 class="text-lg font-semibold">Agregar materia a mis materias</h3>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Materia</label>
                        <select id="nombreMateria1" class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
                            <option value="">Cargando materias...</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                        <select id="nivelMateria1" class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
                            <option value="">Selecciona un nivel</option>
                            <option value="Básico">Básico</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </select>
                    </div>
                    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">Agregar Materia</button>
                </form>

                <!-- RECUADRO 2 -->
                <form id="formMateria2" class="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
                    <h3 class="text-lg font-semibold">Registrar nueva materia</h3>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input type="text" id="nombreMateria2" class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                        <input type="text" id="nivelMateria2" class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">Registrar Materia</button>
                </form>

                <div id="mensajeMateria" class="mb-4"></div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-4">Lista de materias</h3>
                    <div id="listaMaterias" class="space-y-4"></div>
                </div>
            </div>
        `;

        await initDropdown();
        await renderMateriasList();

        // Evento Recuadro 1
        document.getElementById("formMateria1").addEventListener("submit", async (e) => {
            e.preventDefault();
            const materiaId = document.getElementById("nombreMateria1").value;
            const nivel = document.getElementById("nivelMateria1").value;
            if (!materiaId || !nivel) {
                mostrarMensaje("Selecciona materia y nivel", "error");
                return;
            }
            await agregarMateriaPorId(materiaId, nivel);
            document.getElementById("formMateria1").reset();
        });

        // Evento Recuadro 2
        document.getElementById("formMateria2").addEventListener("submit", async (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombreMateria2").value.trim();
            const nivel = document.getElementById("nivelMateria2").value.trim();
            await registrarMateria(nombre, nivel);
            document.getElementById("formMateria2").reset();
        });
    }

    init();
}





