export function showMaterias(contentBox) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        contentBox.innerHTML = `<p class="text-red-600">Inicia sesión para ver y agregar materias.</p>`;
        return;
    }

    // Función para cargar las materias del usuario
    async function cargarMaterias() {
        try {
            // Primero obtenemos los IDs de las materias del usuario
            const responseRegistros = await fetch(
                `http://127.0.0.1:8000/getMateriasByUserID?user_id=${userData.USER_ID}`
            );
            
            if (!responseRegistros.ok) throw new Error("Error al obtener registros");
            
            const materias = await responseRegistros.json();
            if (materias.length === 0) return [];
            
            
            return materias;
            
        } catch (error) {
            console.error("Error al cargar materias:", error);
            return [];
        }
    }

    // Función para renderizar la lista de materias
    async function renderMateriasList() {
        const materias = await cargarMaterias();
        const lista = materias.map(materia => `
            <form class="bg-white border rounded p-4 space-y-4 mb-4" data-id="${materia.MATERIA_ID}">
                <div>
                    <label class="block font-semibold">Nombre de la materia:</label>
                    <input type="text" value="${materia.NOMBRE || ''}" 
                           class="nombre-input w-full p-2 border rounded" disabled />
                </div>
                <div>
                    <label class="block font-semibold">Nivel:</label>
                    <input type="text" value="${materia.NIVEL || ''}" 
                           class="nivel-input w-full p-2 border rounded" disabled />
                </div>
                <div class="flex gap-2">
                    <button type="button" class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                        Editar
                    </button>
                    <button type="button" 
                            class="save-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded hidden">
                        Guardar
                    </button>
                    <button type="button" 
                            class="cancel-btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded hidden">
                        Cancelar
                    </button>
                </div>
            </form>
        `).join("");

        document.getElementById("listaMaterias").innerHTML = lista || 
            '<p class="text-gray-500">No tienes materias registradas.</p>';

        // Configurar eventos para los botones
        configurarEventos();
    }

    function configurarEventos() {
        // Botón Editar
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const form = e.target.closest("form");
                form.querySelector(".nombre-input").disabled = false;
                form.querySelector(".nivel-input").disabled = false;
                form.querySelector(".save-btn").classList.remove("hidden");
                form.querySelector(".cancel-btn").classList.remove("hidden");
                e.target.classList.add("hidden");
            });
        });

        // Botón Cancelar
        document.querySelectorAll(".cancel-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const form = e.target.closest("form");
                resetForm(form);
            });
        });

        // Botón Guardar
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
                    await renderMateriasList(); // Recargar la lista
                    
                } catch (error) {
                    console.error("Error:", error);
                    mostrarMensaje("Error al actualizar la materia", "error");
                    resetForm(form);
                }
            });
        });
    }

    function resetForm(form) {
        form.querySelector(".nombre-input").disabled = true;
        form.querySelector(".nivel-input").disabled = true;
        form.querySelector(".save-btn").classList.add("hidden");
        form.querySelector(".cancel-btn").classList.add("hidden");
        form.querySelector(".edit-btn").classList.remove("hidden");
    }

    function mostrarMensaje(texto, tipo) {
        const mensajeDiv = document.getElementById("mensajeMateria");
        mensajeDiv.innerHTML = `
            <p class="${tipo === 'success' ? 'text-green-600' : 'text-red-600'}">
                ${texto}
            </p>
        `;
        setTimeout(() => mensajeDiv.innerHTML = '', 3000);
    }

    // Estructura HTML inicial
    contentBox.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold mb-6">Mis Materias</h2>
            
            <form id="formMateria" class="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
                <h3 class="text-lg font-semibold">Agregar nueva materia</h3>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" id="nombreMateria" 
                           class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                    <input type="text" id="nivelMateria" 
                           class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" required>
                </div>
                <button type="submit" 
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
                    Agregar Materia
                </button>
            </form>
            
            <div id="mensajeMateria" class="mb-4"></div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-4">Lista de materias</h3>
                <div id="listaMaterias" class="space-y-4"></div>
            </div>
        </div>
    `;

    // Cargar materias al iniciar
    renderMateriasList();

    // Evento para agregar nueva materia
    document.getElementById("formMateria").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById("nombreMateria").value.trim();
        const nivel = document.getElementById("nivelMateria").value.trim();

        try {
            // Agregar la materia
            const responseMateria = await fetch("http://127.0.0.1:8000/agregarMateria", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    NOMBRE: nombre, 
                    NIVEL: nivel
                })
            });

            if (!responseMateria.ok) throw new Error("Error al agregar materia");

            const nuevaMateria = await responseMateria.json();
            
            // Crear la relación usuario-materia
            const responseRegistro = await fetch("http://127.0.0.1:8000/updateRegistroMateriasUsuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    USER_ID: userData.USER_ID,
                    MATERIA_ID: nuevaMateria.MATERIA_ID
                })
            });

            if (!responseRegistro.ok) throw new Error("Error al registrar relación");

            mostrarMensaje("Materia agregada correctamente", "success");
            document.getElementById("formMateria").reset();
            await renderMateriasList(); // Recargar la lista
            
        } catch (error) {
            console.error("Error:", error);
            mostrarMensaje("Error al agregar la materia", "error");
        }
    });
}
