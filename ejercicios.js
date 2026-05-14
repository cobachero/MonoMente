document.addEventListener("DOMContentLoaded", () => {
  const storedData = JSON.parse(localStorage.getItem("respuestas"));
  const data = storedData || {};
  const mood = Number(data.mood || 0);
  const stressLevel = Number(data.stressLevel || 0);
  const causes = Array.isArray(data.causes) ? data.causes : [];
  const reactions = Array.isArray(data.reactions) ? data.reactions : [];

  const contenedor = document.querySelector('.tips-grid');

  if (!contenedor || !storedData) {
    return;
  }

  let exercises = [];

  const exerciseImageMap = {
    "Respira lento 4-7-8 por 2 minutos.": "mono-respira.png",
    "Haz 3 estiramientos suaves de brazos y cuello.": "monocansancio.png",
    "Camina 5 minutos al aire libre sin teléfono.": "monoactividad.png",
    "Escribe en una hoja lo que estás sintiendo durante 5 minutos.": "monos-fuego.png",
    "Toma un vaso de agua y haz una pausa breve.": "mono-duerme.png",
    "Organiza tu tarea en bloques de 20 minutos y anota el avance.": "monoescuela.png",
    "Trabaja 25 minutos y descansa 5.": "monotiempo.png",
    "Cierra los ojos 2 minutos, relaja tus hombros y respira tranquilo.": "ejercicios.png",
    "Apaga notificaciones y deja el teléfono a un lado por 10 minutos.": "mono-telefono.png",
    "Haz movimientos libres durante 2 minutos con tu música favorita.": "monoactividad.png",
    "Camina con intención y respira profundo 2 minutos.": "monoactividad.png",
    "Abraza tus brazos y respira profundo durante 1 minuto.": "monoabrazo.png",
    "Haz respiraciones suaves: inhala 4, exhala 6, repite 4 veces.": "mono-respira.png",
    "Cierra los ojos 1 minuto y cuenta tus respiraciones.": "ejercicios.png",
    "Escribe una lista de 3 cosas pequeñas que te hicieron bien hoy.": "mono-corazon.png"
  };

  if (stressLevel >= 4) {
    exercises.push("Respira lento 4-7-8 por 2 minutos.");
    exercises.push("Haz 3 estiramientos suaves de brazos y cuello.");
  } else if (stressLevel === 3) {
    exercises.push("Camina 5 minutos al aire libre sin teléfono.");
  } else {
    exercises.push("Toma un vaso de agua y haz una pausa breve.");
  }

  if (mood <= 2) {
    exercises.push("Escribe en una hoja lo que estás sintiendo durante 5 minutos.");
  } else if (mood === 3) {
    exercises.push("Cierra los ojos 2 minutos, relaja tus hombros y respira tranquilo.");
  } else {
    exercises.push("Haz movimientos libres durante 2 minutos con tu música favorita.");
  }

  if (causes.includes("escuela")) {
    exercises.push("Organiza tu tarea en bloques de 20 minutos y anota el avance.");
    exercises.push("Trabaja 25 minutos y descansa 5.");
  }

  if (causes.includes("tiempo")) {
    exercises.push("Cierra los ojos 2 minutos, relaja tus hombros y respira tranquilo.");
    exercises.push("Apaga notificaciones y deja el teléfono a un lado por 10 minutos.");
  }

  if (causes.includes("cansancio")) {
    exercises.push("Haz 3 estiramientos suaves de brazos y cuello.");
    exercises.push("Cierra los ojos 1 minuto y cuenta tus respiraciones.");
  }

  if (causes.includes("redes")) {
    exercises.push("Apaga notificaciones y deja el teléfono a un lado por 10 minutos.");
    exercises.push("Haz movimientos libres durante 2 minutos con tu música favorita.");
  }

  if (causes.includes("personales")) {
    exercises.push("Camina con intención y respira profundo 2 minutos.");
    exercises.push("Escribe una lista de 3 cosas pequeñas que te hicieron bien hoy.");
  }

  if (causes.includes("ambiente")) {
    exercises.push("Abraza tus brazos y respira profundo durante 1 minuto.");
  }

  if (reactions.includes("guardo")) {
    exercises.push("Escribe en una hoja lo que estás sintiendo durante 5 minutos.");
  }

  if (reactions.includes("aislo")) {
    exercises.push("Cierra los ojos 2 minutos, relaja tus hombros y respira tranquilo.");
  }

  if (reactions.includes("telefono")) {
    exercises.push("Apaga notificaciones y deja el teléfono a un lado por 10 minutos.");
  }

  if (reactions.includes("abrazo")) {
    exercises.push("Abraza tus brazos y respira profundo durante 1 minuto.");
  }

  if (reactions.includes("llorar")) {
    exercises.push("Haz respiraciones suaves: inhala 4, exhala 6, repite 4 veces.");
  }

  if (reactions.includes("descansar")) {
    exercises.push("Cierra los ojos 1 minuto y cuenta tus respiraciones.");
  }

  if (reactions.includes("actividad")) {
    exercises.push("Haz movimientos libres durante 2 minutos con tu música favorita.");
  }

  const fragment = document.createDocumentFragment();
  const colors = ['card-green', 'card-brown', 'card-purple', 'card-pink', 'card-yellow', 'card-cyan'];

  exercises.forEach((exercise, index) => {
    const card = document.createElement('div');
    const colorClass = colors[index % colors.length];
    card.className = `tip-card ${colorClass}`;

    const heading = document.createElement('h3');
    heading.textContent = 'Ejercicio recomendado';
    card.appendChild(heading);

    const paragraph = document.createElement('p');
    paragraph.textContent = exercise;
    card.appendChild(paragraph);

    const imageName = exerciseImageMap[exercise];
    if (imageName) {
      const image = document.createElement('img');
      image.src = imageName;
      image.alt = `Imagen para ejercicio`;
      image.className = 'card-img';
      card.appendChild(image);
    }

    fragment.appendChild(card);
  });

  const separador = document.createElement('div');
  separador.className = 'tip-card';
  separador.style.gridColumn = '1 / -1';
  separador.style.background = 'rgba(0,0,0,0.05)';
  separador.style.borderTop = '2px solid rgba(0,0,0,0.2)';
  separador.style.borderBottom = '2px solid rgba(0,0,0,0.2)';
  separador.style.padding = '15px';
  separador.style.textAlign = 'center';

  const separadorText = document.createElement('p');
  separadorText.textContent = '✨ Ejercicios simples para ayudarte en este momento ✨';
  separadorText.style.fontWeight = 'bold';
  separadorText.style.margin = '0';
  separador.appendChild(separadorText);

  fragment.appendChild(separador);
  contenedor.prepend(fragment);
});
