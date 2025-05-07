// Generador de HTML para el formulario
function generateProfileForm(userData) {
  return `
      <h2 class="text-xl font-semibold mb-4">Perfil</h2>
      <form id="editProfileForm" class="space-y-4">
          <div><label class="block font-semibold">Nombre de Usuario:</label><input type="text" id="editUsername" value="${userData.USERNAME}" class="w-full p-2 border rounded" disabled></div>
          <div><label class="block font-semibold">Nombre(s):</label><input type="text" id="editNombreS" class="w-full p-2 border rounded" disabled></div>
          <div><label class="block font-semibold">Apellido(s):</label><input type="text" id="editApellidoS" class="w-full p-2 border rounded" disabled></div>
          <div><label class="block font-semibold">Email:</label><input type="email" id="editEmail" value="${userData.EMAIL}" class="w-full p-2 border rounded" disabled></div>
          <div><label class="block font-semibold">Contraseña:</label><input type="password" id="editPassword" value="${userData.PASSWORD}" class="w-full p-2 border rounded" disabled></div>
          <!-- Más campos abajo... -->
          <div class="flex space-x-4">
              <button type="button" id="editBtn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</button>
              <button type="submit" id="saveBtn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hidden">Guardar Cambios</button>
          </div>
      </form>
      <div id="editMessage" class="mt-4"></div>
  `;
}
