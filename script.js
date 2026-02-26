// Obtener elementos del DOM
const nameInput = document.getElementById("name");
const weightInput = document.getElementById("weight"); // CORREGIDO: "weight" no "weigth"
const distanceInput = document.getElementById("distance");
const discountCodeInput = document.getElementById("discount-code");
const button = document.getElementById("button");
const resultadoContenido = document.getElementById("resultado-contenido");

// Función principal para calcular
function calcularEnvio() {
    // Validacion de campos obligatorios
    if (!nameInput.value.trim()) {
        alert("Por favor ingresa tu nombre");
        return;
    }

    if (!weightInput.value.trim()) {
        alert("Por favor ingresa el peso del paquete");
        return;
    }

    if (!distanceInput.value.trim()) {
        alert("Por favor ingresa la distancia");
        return;
    }

    // Obtener valores y convertir a numeros
    const nombre = nameInput.value.trim();
    const peso = parseFloat(weightInput.value);
    const distancia = parseInt(distanceInput.value);
    const codigoDescuento = discountCodeInput.value.trim(); // CORREGIDO: agregar paréntesis ()

    // Validar el peso
    if (peso <= 0 || isNaN(peso)) { // CORREGIDO: agregar validación isNaN
        alert("El peso debe ser un número mayor a 0");
        return;
    }

    // Validar distancia
    if (distancia <= 0 || isNaN(distancia)) { // CORREGIDO: agregar validación isNaN
        alert("La distancia debe ser un número mayor a 0");
        return;
    }

    // 1) Costo base por peso
    let costoPeso = peso * 2.0; // CORREGIDO: era 0.2, debe ser 2.0 según requerimientos

    // 2) Costo por distancia
    let costoDistancia = distancia * 0.05; // CORREGIDO: era distanceInput, debe ser distancia

    // 3) Subtotal
    let subtotal = costoPeso + costoDistancia;

    // 4) Descuento
    let descuentoAplicado = 0;
    let mensajeDescuento = "";
    let totalConDescuento = subtotal; // CORREGIDO: inicializar con subtotal

    if (codigoDescuento) {
        if (codigoDescuento === "WEB10") {
            descuentoAplicado = subtotal * 0.10;
            totalConDescuento = subtotal * 0.90;
            mensajeDescuento = "10%";
        } else if (codigoDescuento === "WEB20") {
            descuentoAplicado = subtotal * 0.20;
            totalConDescuento = subtotal * 0.80;
            mensajeDescuento = "20%";
        } else {
            mensajeDescuento = "Código no válido, no se aplicó descuento";
            totalConDescuento = subtotal; // CORREGIDO: asegurar que totalConDescuento tenga valor
        }
    } else {
        mensajeDescuento = "No se aplicó descuento";
    }

    // 5) Impuesto
    let impuesto = totalConDescuento * 0.08;

    // 6) Total final
    let total = totalConDescuento + impuesto;

    // Mostrar resultados
    mostrarResultado({
        nombre,
        costoPeso,
        costoDistancia,
        subtotal,
        descuentoAplicado,
        mensajeDescuento,
        totalConDescuento,
        impuesto,
        total,
        codigoDescuento
    });
}

// CORREGIDO: nombre de función (estaba "moostrarResultado")
function mostrarResultado(datos) {
    const resultadoHTML = 
        `<p><strong>Nombre del cliente:</strong> ${datos.nombre}</p>
        <p><strong>Costo por peso:</strong> $${datos.costoPeso.toFixed(2)} USD</p>
        <p><strong>Costo por distancia:</strong> $${datos.costoDistancia.toFixed(2)} USD</p>
        <p><strong>Subtotal:</strong> $${datos.subtotal.toFixed(2)} USD</p>
        <p><strong>Descuento Aplicado:</strong> ${datos.mensajeDescuento} ${datos.descuentoAplicado > 0 ? '($' + datos.descuentoAplicado.toFixed(2) + ' USD)' : ''}</p>
        <p><strong>Total con descuento:</strong> $${datos.totalConDescuento.toFixed(2)} USD</p>
        <p><strong>Impuesto (8%):</strong> $${datos.impuesto.toFixed(2)} USD</p>
        <p><strong>Total Final:</strong> $${datos.total.toFixed(2)} USD</p>`;

    resultadoContenido.innerHTML = resultadoHTML;
}

// Evento al boton
button.addEventListener("click", calcularEnvio);

// Eventos para tecla Enter
const inputs = [nameInput, weightInput, distanceInput, discountCodeInput];
inputs.forEach(input => {
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            calcularEnvio();
        }
    });
});