// Selects the first element with the class "content-box" in the document
document.addEventListener("DOMContentLoaded", function() {
    const contentBox = document.querySelector(".content-box");

// Add an event listener to the "link-profile" element that triggers when clicked
    document.getElementById("link-profile").addEventListener("click", function(event) {
// Prevent the click on the link (link-profile) from navigating to a new page
        event.preventDefault();
        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Perfil</h2>
            <p>Información del perfil de usuario.</p>
        `;
    });

    document.getElementById("link-misClases").addEventListener("click", function(event) {
        event.preventDefault();
        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Mis Clases</h2>
            <p>Información sobre las clases en las que estás inscrito.</p>
        `;
    });

    document.getElementById("link-tareas").addEventListener("click", function(event) {
        event.preventDefault();
        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Tareas</h2>
            <p>Listado de tareas pendientes y completadas.</p>
        `;
    });

    document.getElementById("link-calificaciones").addEventListener("click", function(event) {
        event.preventDefault();
        contentBox.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Calificaciones</h2>
            <p>Resumen de las calificaciones en las diferentes materias.</p>
        `;
    });
});
