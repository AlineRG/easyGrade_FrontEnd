export function showClases(contentBox) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
      contentBox.innerHTML = `<p class="text-red-600">Inicia sesión para ver y agregar clases.</p>`;
      return;
  }

  // Cargar clases desde el backend
  fetch(`http://127.0.0.1:8000/clases/${userData.USER_ID}`)
      .then(response => response.json())
      .then(clases => renderClasesForm(contentBox, clases))
      .catch(error => {
          console.error("Error cargando clases:", error);
          renderClasesForm(contentBox, []);
      });
}

function renderClasesForm(contentBox, clases) {
  contentBox.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">Mis Clases</h2>
      <form id="formClase" class="space-y-4 mb-6">
          <div>
              <label class="block font-semibold">Nombre de la clase:</label>
              <input type="text" id="nombreClase" class="w-full p-2 border rounded" required>
          </div>
          <div>
              <label class="block font-semibold">Hora de la clase:</label>
              <input type="time" id="horaClase" class="w-full p-2 border rounded" required>
          </div>
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Agregar Clase</button>
      </form>
      <div id="listaClases">
          ${clases.map(c => `<p class="mb-2">📚 ${c.NOMBRE} a las ${c.HORA}</p>`).join('')}
      </div>
  `;

  document.getElementById("formClase").addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombreClase").value.trim();
      const hora = document.getElementById("horaClase").value;

      const userData = JSON.parse(localStorage.getItem("userData"));
      const nuevaClase = {
          USER_ID: userData.USER_ID,
          NOMBRE: nombre,
          HORA: hora
      };

      fetch("http://127.0.0.1:8000/agregarClase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaClase)
      })
      .then(res => res.json())
      .then(() => showClases(contentBox))
      .catch(error => console.error("Error al agregar clase:", error));
  });
}
