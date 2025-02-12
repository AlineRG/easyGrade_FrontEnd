// Selects the first element with the class "content-box" in the document
document.addEventListener("DOMContentLoaded", function() {
    const contentBox = document.querySelector(".content-box");

    // Datos simulados 
    let userData = {
        nombre: "Juan Pérez",
        edad: 25,
        direccion: "Calle Reforma 124"
    };

    let classesData = [
        { id: 1, nombre: "Matemáticas", maestro: "Prof. García" },
        { id: 2, nombre: "Historia", maestro: "Prof. Rodríguez" },
        { id: 3, nombre: "Ciencias", maestro: "Prof. Martínez" }
    ];

    let tareasData = [
        { id: 1, nombre: "Tarea de Matemáticas", completada: false, fecha: "2024-10-01" },
        { id: 2, nombre: "Ensayo de Historia", completada: false, fecha: "2024-10-03" }
    ];

    let calificacionesData = [
        { id: 1, materia: "Matemáticas", calificacion: 85 },
        { id: 2, materia: "Historia", calificacion: 92 },
        { id: 3, materia: "Ciencias", calificacion: 78 }
    ];

    // Add an event listener to the "link-profile" element that triggers when clicked

    document.getElementById("link-profile").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default behavior of the link (navigating to another page)
        showProfile(); // Call the function to display the profile section
    });

    document.getElementById("link-misClases").addEventListener("click", function(event) {
        event.preventDefault();
        showClasses();
    });

    document.getElementById("link-tareas").addEventListener("click", function(event) {
        event.preventDefault();
        showTareas();
    });

    document.getElementById("link-calificaciones").addEventListener("click", function(event) {
        event.preventDefault();
        showCalificaciones();
    });

    function showProfile() {
        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Perfil</h2>
            <div id="profile-info">
                <p><strong>Nombre:</strong> <span id="nombre">${userData.nombre}</span></p>
                <p><strong>Edad:</strong> <span id="edad">${userData.edad}</span></p>
                <p><strong>Dirección:</strong> <span id="direccion">${userData.direccion}</span></p>
                <button id="edit-btn" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Editar Información
                </button>
            </div>
            <div id="edit-form" class="hidden mt-4">
                <input id="nombre-input" class="block w-full px-3 py-2 mb-2 border rounded" type="text" value="${userData.nombre}">
                <input id="edad-input" class="block w-full px-3 py-2 mb-2 border rounded" type="number" value="${userData.edad}">
                <input id="direccion-input" class="block w-full px-3 py-2 mb-2 border rounded" type="text" value="${userData.direccion}">
                <button id="save-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Guardar Cambios
                </button>
            </div>
        `;

        addProfileEventListeners(); // Run the function to make the buttons work when clicked
    }

    function addProfileEventListeners() {
        // Get references to the "Edit" and "Save" buttons
        const editBtn = document.getElementById("edit-btn");
        const saveBtn = document.getElementById("save-btn");

        // If the "Edit" button exists, add a click event listener to it
        if (editBtn) {
            editBtn.addEventListener("click", function() {
                document.getElementById("profile-info").classList.add("hidden"); // Hide the profile information section
                document.getElementById("edit-form").classList.remove("hidden"); // Show the edit form so the user can update their details

            });
        }

        if (saveBtn) { // If the "Save" button exists, add a click event listener to it
            saveBtn.addEventListener("click", function() {
                // Get the values entered in the input fields and update the userData object
                userData.nombre = document.getElementById("nombre-input").value;
                userData.edad = document.getElementById("edad-input").value;
                userData.direccion = document.getElementById("direccion-input").value;

                // Update the profile information displayed on the page
                document.getElementById("nombre").textContent = userData.nombre;
                document.getElementById("edad").textContent = userData.edad;
                document.getElementById("direccion").textContent = userData.direccion;

                // Show the updated profile information
                document.getElementById("profile-info").classList.remove("hidden");
                // Hide the edit form after saving the changes
                document.getElementById("edit-form").classList.add("hidden");
            });
        }
    }

    function showClasses() {
        // Create the HTML structure for each class using the data from the classesData array
        let classesHTML = classesData.map(clase => `
            <div class="class-item mb-4 p-4 bg-gray-100 rounded" data-id="${clase.id}">
                <p><strong>Clase:</strong> <span class="class-name">${clase.nombre}</span></p>
                <p><strong>Maestro:</strong> <span class="teacher-name">${clase.maestro}</span></p>
                <button class="edit-class-btn mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
                    Editar
                </button>
            </div>
        `).join(''); // Convert the array of class elements into a single string

        // Insert the generated HTML into the contentBox element
        contentBox.innerHTML = ` 
            <h2 class="text-xl font-semibold mb-4">Mis Clases</h2>
            <div id="classes-list">
                ${classesHTML}
            </div>
            <div id="edit-class-form" class="hidden mt-4">
                <input id="class-name-input" class="block w-full px-3 py-2 mb-2 border rounded" type="text" placeholder="Nombre de la clase">
                <input id="teacher-name-input" class="block w-full px-3 py-2 mb-2 border rounded" type="text" placeholder="Nombre del maestro">
                <button id="save-class-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Guardar Cambios
                </button>
            </div>
        `;

        addClassesEventListeners();
    }

    function addClassesEventListeners() {
        const editButtons = document.querySelectorAll('.edit-class-btn');
        const saveButton = document.getElementById('save-class-btn');
        const editForm = document.getElementById('edit-class-form');

        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const classItem = this.closest('.class-item');
                const classId = classItem.dataset.id;
                const className = classItem.querySelector('.class-name').textContent;
                const teacherName = classItem.querySelector('.teacher-name').textContent;

                document.getElementById('class-name-input').value = className;
                document.getElementById('teacher-name-input').value = teacherName;

                editForm.classList.remove('hidden');
                editForm.dataset.editingId = classId;
            });
        });

        if (saveButton) {
            saveButton.addEventListener('click', function() {
                const editingId = editForm.dataset.editingId;
                const newClassName = document.getElementById('class-name-input').value;
                const newTeacherName = document.getElementById('teacher-name-input').value;

                const classToUpdate = classesData.find(c => c.id === parseInt(editingId));
                if (classToUpdate) {
                    classToUpdate.nombre = newClassName;
                    classToUpdate.maestro = newTeacherName;
                }

                showClasses();
            });
        }
    }
    function showTareas() {
        // Recorre el array tareasData, que contiene información sobre tareas , para cada tarea en el array, secrea un fragmento de código HTML.
        let tareasHTML = tareasData.map(tarea => `
            <div class="tarea-item mb-4 p-4 bg-gray-100 rounded flex justify-between items-center" data-id="${tarea.id}">
                <div>
                    <p class="${tarea.completada ? 'line-through text-gray-500' : ''}">
                        <strong>${tarea.nombre}</strong> - ${tarea.fecha}
                    </p>
                </div>
                <div>
                    <button class="complete-tarea-btn ${tarea.completada ? 'bg-green-500' : 'bg-yellow-500'} mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
                        ${tarea.completada ? 'Completada' : 'Marcar como completada'}
                    </button>
                    <button class="delete-tarea-btn mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
                        Eliminar
                    </button>
                </div>
            </div>
        `).join('');

        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Mis Tareas</h2>
            <div id="tareas-list">
                ${tareasHTML}
            </div>
            <div class="mt-4">
                <h3 class="text-lg font-semibold mb-2">Agregar Nueva Tarea</h3>
                <input id="new-tarea-name" class="block w-full px-3 py-2 mb-2 border rounded" type="text" placeholder="Nombre de la tarea">
                <input id="new-tarea-date" class="block w-full px-3 py-2 mb-2 border rounded" type="date">
                <button id="add-tarea-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Agregar Tarea
                </button>
            </div>
        `;

        addTareasEventListeners();
    }

    function addTareasEventListeners() {
        document.querySelectorAll('.complete-tarea-btn').forEach(button => {
            button.addEventListener('click', function() {
                const tareaItem = this.closest('.tarea-item');
                const tareaId = parseInt(tareaItem.dataset.id);
                const tarea = tareasData.find(t => t.id === tareaId);
                if (tarea) {
                    tarea.completada = !tarea.completada;
                    showTareas();
                }
            });
        });

        document.querySelectorAll('.delete-tarea-btn').forEach(button => {
            button.addEventListener('click', function() {
                const tareaItem = this.closest('.tarea-item');
                const tareaId = parseInt(tareaItem.dataset.id);
                tareasData = tareasData.filter(t => t.id !== tareaId);
                showTareas();
            });
        });

        document.getElementById('add-tarea-btn').addEventListener('click', function() {
            const newTareaName = document.getElementById('new-tarea-name').value;
            const newTareaDate = document.getElementById('new-tarea-date').value;

            if (newTareaName && newTareaDate) {
                tareasData.push({
                    id: tareasData.length + 1,
                    nombre: newTareaName,
                    completada: false,
                    fecha: newTareaDate
                });
                showTareas();
            }
        });
    }
    function showCalificaciones() {
        let calificacionesHTML = calificacionesData.map(calificacion => `
            <div class="calificacion-item mb-4 p-4 bg-gray-100 rounded">
                <p><strong>Materia:</strong> ${calificacion.materia}</p>
                <p><strong>Calificación:</strong> ${calificacion.calificacion}</p>
            </div>
        `).join('');

        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Calificaciones</h2>
            <p class="mb-4">Resumen de las calificaciones en las diferentes materias.</p>
            <div id="calificaciones-list">
                ${calificacionesHTML}
            </div>
        `;
    }
});


