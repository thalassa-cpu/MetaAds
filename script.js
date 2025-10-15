const notificationContainer = document.getElementById('notification-container');

// datos ejemplo
const names = ["Juan M.", "Sofía P.", "Carlos G.", "Ana L.", "Miguel V.", "Elena R.", "Pedro S.", "Lucía C."];
const games = ["Ruleta", "Tragamonedas", "Blackjack", "Póker", "Baccarat", "Video Slots"];

// Variable para controlar si hay una notificación activa
let isNotificationActive = false;

// Función para obtener un número aleatorio entre min y max (incluidos)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para formatear el número con puntos como separador de miles (formato de Argentina)
function formatCurrency(amount) {
    // Ejemplo: 4000000 -> $4.000.000
    return '$' + amount.toLocaleString('es-AR', { minimumFractionDigits: 0 });
}

// Función principal para crear, mostrar y programar la eliminación de una notificación
function showNotification() {
    // Si ya hay una notificación activa, no crear otra
    if (isNotificationActive) return;
    
    isNotificationActive = true;

    // 1. Generar datos aleatorios para el mensaje
    const randomName = names[getRandomInt(0, names.length - 1)];
    const randomGame = games[getRandomInt(0, games.length - 1)];
    
    // Monto entre $500.000 y $10.000.000
    const randomAmount = getRandomInt(5, 100) * 100000; 
    const formattedAmount = formatCurrency(randomAmount);

    // 2. Crear el elemento de notificación (el cartel)
    const notification = document.createElement('div');
    notification.classList.add('notification');
    
    // 3. Contenido del cartel: "Juan M. ganó $4.000.000 en Ruleta."
    notification.innerHTML = `
        <div class="notification-title">¡GANANCIA EN VIVO!</div>
        <div class="notification-text">
            <span style="color: #FFF;">${randomName}</span> ganó
            <span class="notification-amount">${formattedAmount}</span> en
            <span style="color: #FFF;">${randomGame}</span>.
        </div>
    `;

    // 4. Agregar al contenedor y mostrar con animación
    notificationContainer.appendChild(notification);
    
    // Pequeño delay de 10ms para activar la transición CSS (slide-in)
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); 
    
    // 5. Ocultar y remover la notificación después de 5 segundos
    const displayTime = 5000; // 5 segundos
    
    setTimeout(() => {
        // Iniciar la transición de salida (slide-out)
        notification.classList.remove('show');
        
        // Remover el elemento del DOM después de que la transición termine (0.5s)
        setTimeout(() => {
            notification.remove();
            isNotificationActive = false; // Liberar para la siguiente notificación
        }, 500); 

    }, displayTime);
}

// 6. Configurar el ciclo de notificaciones con intervalos irregulares
function startLiveFeed() {
    // Función recursiva para crear un flujo de notificaciones irregular
    function scheduleNextNotification() {
        // Generar una demora aleatoria entre 2 y 6 segundos
        const minDelay = 2000; 
        const maxDelay = 6000; 
        const randomDelay = getRandomInt(minDelay, maxDelay);
        
        setTimeout(() => {
            showNotification();
            scheduleNextNotification(); // Llamarse a sí misma para programar la siguiente
        }, randomDelay);
    }

    // Iniciar el ciclo
    scheduleNextNotification();
}

// Iniciar todo cuando la página carga completamente
document.addEventListener('DOMContentLoaded', startLiveFeed);