// Carga y actualización de los datos de contacto
let contactoData = null;

function loadContactData(userId) {
    fetch(`http://127.0.0.1:8000/contacto/${userId}`)
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
}
