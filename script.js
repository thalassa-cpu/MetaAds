const notificationContainer = document.getElementById('notification-container');

// Datos de ejemplo con nombres más realistas
const names = ["Antonela0587", "Laucharo1190", "Lujan9629", "Teo9616", "Bauti2527", "Adrian0223", "Lapulguita5008", "Tantin4444"];
const games = ["Ruleta", "Sweet Bonanza", "Big Bass Bonanza", "Combinada deportiva", "Blackjack", "Joker Flip"];

// Variable para controlar si hay una notificación activa
let isNotificationActive = false;

// Función para obtener un número aleatorio entre min y max (incluidos)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para formatear el número con puntos como separador de miles (formato de Argentina)
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('es-AR', { minimumFractionDigits: 0 });
}

// Función para generar montos más realistas con distribución ponderada
function generateRealisticAmount() {
    const random = Math.random();
    
    // 60% de probabilidad: $15.000 - $80.000 (ganancias pequeñas)
    if (random < 0.6) {
        return getRandomInt(15, 80) * 1000;
    }
    // 30% de probabilidad: $80.000 - $250.000 (ganancias medianas)
    else if (random < 0.9) {
        return getRandomInt(80, 250) * 1000;
    }
    // 10% de probabilidad: $250.000 - $800.000 (ganancias grandes - RARAS)
    else {
        return getRandomInt(250, 800) * 1000;
    }
}

function showNotification() {
    // No aparece otra si hay una activa
    if (isNotificationActive) return;
    
    isNotificationActive = true;

    // Datos aleatorios
    const randomName = names[getRandomInt(0, names.length - 1)];
    const randomGame = games[getRandomInt(0, games.length - 1)];
    
    // Montos REALISTAS con distribución ponderada
    const randomAmount = generateRealisticAmount();
    const formattedAmount = formatCurrency(randomAmount);

    // Crear el cartel con efecto de pulso
    const notification = document.createElement('div');
    notification.classList.add('notification');
    
    // Contenido del cartel con iconos y mejor jerarquía
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-title">¡GANANCIA EN VIVO!</div>
            <div class="notification-text">
                <span class="notification-name">${randomName}</span> ganó
                <span class="notification-amount">${formattedAmount}</span> en
                <span class="notification-game">${randomGame}</span>
            </div>
        </div>
    `;

    // Agregar al contenedor
    notificationContainer.appendChild(notification);
    
    // Activar animación de entrada con delay
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); 
    
    // Tiempo de visualización
    const displayTime = 5000;
    
    setTimeout(() => {
        // Animación de salida
        notification.classList.remove('show');
        
        // Remover del DOM
        setTimeout(() => {
            notification.remove();
            isNotificationActive = false;
        }, 500); 

    }, displayTime);
}

// Configurar el ciclo de notificaciones
function startLiveFeed() {
    function scheduleNextNotification() {
        // Intervalo más amplio: entre 3 y 8 segundos (más natural)
        const minDelay = 3000; 
        const maxDelay = 8000; 
        const randomDelay = getRandomInt(minDelay, maxDelay);
        
        setTimeout(() => {
            showNotification();
            scheduleNextNotification();
        }, randomDelay);
    }

    scheduleNextNotification();
}

// Iniciar cuando carga la página
document.addEventListener('DOMContentLoaded', startLiveFeed);
