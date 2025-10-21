document.getElementById("btn-estudiante").addEventListener("click", mostrarFormularioEstudiante);
document.getElementById("btn-asignatura").addEventListener("click", mostrarFormularioAsignatura);
document.getElementById("btn-notas").addEventListener("click", mostrarFormularioNotas);

document.getElementById("btn-ver-estudiantes").addEventListener("click", mostrarEstudiantes);
document.getElementById("btn-ver-asignaturas").addEventListener("click", mostrarAsignaturas);
document.getElementById("btn-ver-notas").addEventListener("click", mostrarNotas);

function mostrarFormularioEstudiante() {
  document.getElementById("form-estudiante").innerHTML = `
    <form onsubmit="registrarEstudiante(event)">
      <h3>Registrar Estudiante</h3>
      <input type="text" id="nombreEstudiante" placeholder="Nombre del estudiante" required />
      <input type="text" id="idEstudiante" placeholder="ID del estudiante" required />
      <button type="submit">Guardar Estudiante</button>
    </form>`;
}

function mostrarFormularioAsignatura() {
  document.getElementById("form-asignatura").innerHTML = `
    <form onsubmit="registrarAsignatura(event)">
      <h3>Registrar Asignatura</h3>
      <input type="text" id="nombreAsignatura" placeholder="Nombre de la asignatura" required />
      <input type="text" id="codigoAsignatura" placeholder="Código de asignatura" required />
      <button type="submit">Guardar Asignatura</button>
    </form>`;
}

function mostrarFormularioNotas() {
  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
  const asignaturas = JSON.parse(localStorage.getItem("asignaturas") || "[]");

  if (estudiantes.length === 0 || asignaturas.length === 0) {
    document.getElementById("form-notas").innerHTML = "<p style='color:red;'>Debe registrar al menos un estudiante y una asignatura.</p>";
    return;
  }

  let opcionesEstudiantes = estudiantes.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');
  let opcionesAsignaturas = asignaturas.map(a => `<option value="${a.codigo}">${a.nombre}</option>`).join('');

  document.getElementById("form-notas").innerHTML = `
    <form onsubmit="registrarNota(event)">
      <h3>Registrar Nota</h3>
      <label>Estudiante:</label>
      <select id="notaEstudiante">${opcionesEstudiantes}</select>
      <label>Asignatura:</label>
      <select id="notaAsignatura">${opcionesAsignaturas}</select>
      <input type="number" id="notaValor" placeholder="Nota (0-20)" min="0" max="20" required />
      <button type="submit">Guardar Nota</button>
    </form>`;
}

function registrarEstudiante(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreEstudiante").value;
  const id = document.getElementById("idEstudiante").value;
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");

  if (estudiantes.some(est => est.id === id)) {
    mostrarMensaje("⚠️ El ID ya está registrado.", true);
    return;
  }

  estudiantes.push({ nombre, id });
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  mostrarMensaje("✅ Estudiante registrado correctamente.");
}

function registrarAsignatura(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreAsignatura").value;
  const codigo = document.getElementById("codigoAsignatura").value;
  let asignaturas = JSON.parse(localStorage.getItem("asignaturas") || "[]");

  if (asignaturas.some(a => a.codigo === codigo)) {
    mostrarMensaje("⚠️ El código ya existe.", true);
    return;
  }

  asignaturas.push({ nombre, codigo });
  localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
  mostrarMensaje("✅ Asignatura registrada correctamente.");
}

function registrarNota(e) {
  e.preventDefault();
  const estudianteId = document.getElementById("notaEstudiante").value;
  const asignaturaCodigo = document.getElementById("notaAsignatura").value;
  const valor = parseFloat(document.getElementById("notaValor").value);
  let notas = JSON.parse(localStorage.getItem("notas") || "[]");
  notas.push({ estudianteId, asignaturaCodigo, valor });
  localStorage.setItem("notas", JSON.stringify(notas));
  mostrarMensaje("✅ Nota registrada correctamente.");
}

function mostrarEstudiantes() {
  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
  if (estudiantes.length === 0) {
    document.getElementById("tabla-estudiantes").innerHTML = "<p>No hay estudiantes registrados.</p>";
    return;
  }
  let tabla = `<table><tr><th>ID</th><th>Nombre</th></tr>`;
  estudiantes.forEach(e => tabla += `<tr><td>${e.id}</td><td>${e.nombre}</td></tr>`);
  tabla += "</table>";
  document.getElementById("tabla-estudiantes").innerHTML = tabla;
}

function mostrarAsignaturas() {
  const asignaturas = JSON.parse(localStorage.getItem("asignaturas") || "[]");
  if (asignaturas.length === 0) {
    document.getElementById("tabla-asignaturas").innerHTML = "<p>No hay asignaturas registradas.</p>";
    return;
  }
  let tabla = `<table><tr><th>Código</th><th>Nombre</th></tr>`;
  asignaturas.forEach(a => tabla += `<tr><td>${a.codigo}</td><td>${a.nombre}</td></tr>`);
  tabla += "</table>";
  document.getElementById("tabla-asignaturas").innerHTML = tabla;
}

function mostrarNotas() {
  const notas = JSON.parse(localStorage.getItem("notas") || "[]");
  if (notas.length === 0) {
    document.getElementById("tabla-notas").innerHTML = "<p>No hay notas registradas.</p>";
    return;
  }
  let tabla = `<table><tr><th>Estudiante</th><th>Asignatura</th><th>Nota</th></tr>`;
  notas.forEach(n => tabla += `<tr><td>${n.estudianteId}</td><td>${n.asignaturaCodigo}</td><td>${n.valor}</td></tr>`);
  tabla += "</table>";
  document.getElementById("tabla-notas").innerHTML = tabla;
}

function mostrarMensaje(msg, esError = false) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = msg;
  mensaje.style.color = esError ? "red" : "green";
  setTimeout(() => mensaje.textContent = "", 3000);
}
