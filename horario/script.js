// Función para cargar las celdas marcadas desde el localStorage
function loadMarkedCells() {
    const markedCells = JSON.parse(localStorage.getItem('markedCells')) || [];
    markedCells.forEach(function(cellIndex) {
        const cell = document.querySelectorAll('td')[cellIndex];
        if (cell) {
            cell.classList.add('marked');
        }
    });
}

// Función para guardar el estado de las celdas marcadas en el localStorage
function saveMarkedCells() {
    const markedCells = [];
    const cells = document.querySelectorAll('td');
    cells.forEach(function(cell, index) {
        if (cell.classList.contains('marked')) {
            markedCells.push(index);
        }
    });
    localStorage.setItem('markedCells', JSON.stringify(markedCells));
}

// Función para actualizar la fecha y hora
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'America/Santo_Domingo'
    };
    document.getElementById('current-datetime').textContent = now.toLocaleString('es-DO', options);
}

// Función para resaltar el día actual
function highlightCurrentDay() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 es domingo, 1 es lunes, ..., 6 es sábado
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const currentDayName = days[currentDay];

    // Obtener todas las celdas de la tabla (excluyendo los encabezados)
    const cells = document.querySelectorAll('tbody td');

    cells.forEach((cell, index) => {
        // Si es sábado o domingo, difuminar todo
        if (currentDay === 0 || currentDay === 6) {
            if (index % 6 !== 0) { // No difuminar la columna de horas
                cell.classList.add('not-current-day');
            }
        } else {
            // Para los días de semana, difuminar los días que no son el actual
            if (index % 6 !== 0 && index % 6 !== currentDay) {
                cell.classList.add('not-current-day');
            }
        }
    });

    // Actualizar el título para reflejar el día actual o fin de semana
    const title = document.querySelector('h1');
    if (currentDay === 0 || currentDay === 6) {
        title.textContent = 'Horario Escolar - Fin de Semana';
    } else {
        title.textContent = `Horario Escolar - ${currentDayName}`;
    }
}

// Cargar las celdas marcadas y actualizar la fecha/hora al cargar la página
window.onload = function() {
    loadMarkedCells();
    updateDateTime();
    highlightCurrentDay();
    // Actualizar la fecha y hora cada segundo
    setInterval(updateDateTime, 1000);
};

// Agregar evento de clic a las celdas
document.querySelectorAll('td').forEach(function(cell) {
    cell.addEventListener('click', function() {
        this.classList.toggle('marked');
        saveMarkedCells(); // Guardar estado cada vez que se hace clic
    });
});

// Agregar evento para el botón Reset
document.getElementById('resetButton').addEventListener('click', function() {
    localStorage.removeItem('markedCells'); // Limpiar el localStorage
    document.querySelectorAll('.marked').forEach(function(cell) {
        cell.classList.remove('marked'); // Quitar clase 'marked' de las celdas
    });
});