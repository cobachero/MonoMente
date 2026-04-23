document.getElementById('wellness-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Crear un objeto con los resultados
    const formData = new FormData(this);
    const results = {
        mood: formData.get('mood'),
        stressLevel: formData.get('stress-level'),
        causes: formData.getAll('causes'),
        reactions: formData.getAll('reaction')
    };

    console.log("Respuestas capturadas:", results);

    if(!results.mood || !results.stressLevel) {
        alert("Por favor, selecciona cómo te sientes y tu nivel de estrés.");
    } else {
        localStorage.setItem('respuestas', JSON.stringify({
            mood: Number(results.mood),
            stressLevel: Number(results.stressLevel),
            causes: results.causes,
            reactions: results.reactions
        }));
        alert("¡Gracias por compartir cómo te sientes!");
        window.location.href = 'tips.html';
    }
});

// Añadir funcionalidad para cambiar color de checkboxes seleccionadas
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
        this.parentElement.classList.toggle('selected', this.checked);
    });
});