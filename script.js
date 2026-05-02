// Efecto Blob que sigue al ratón
const blob = document.getElementById("blob");

// Variables para animación suave
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

// Escuchamos el movimiento del ratón
document.body.onpointermove = event => { 
    targetX = event.clientX;
    targetY = event.clientY;
};

// Función para interpolación lineal (suaviza el movimiento)
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Bucle de animación para el blob
function animateBlob() {
    currentX = lerp(currentX, targetX, 0.05);
    currentY = lerp(currentY, targetY, 0.05);

    blob.style.left = `${currentX}px`;
    blob.style.top = `${currentY}px`;

    requestAnimationFrame(animateBlob);
}

// Iniciar animación del blob
animateBlob();

// Animaciones de scroll (Reveal)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-reveal');
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
}, observerOptions);

// Aplicar el observador a todos los elementos con la clase hidden-reveal
document.querySelectorAll('.hidden-reveal').forEach((el) => {
    observer.observe(el);
});
