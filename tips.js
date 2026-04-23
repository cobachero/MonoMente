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

  let tips = [];

  // 🧠 1. Nivel de estrés
  if (stressLevel >= 4) {
    tips.push("🧘‍♂️ Estás muy saturado. Tómate una pausa, respira profundo y aléjate un momento.");
  } else if (stressLevel == 3) {
    tips.push("😌 Vas manejando el estrés, pero no ignores cómo te sientes.");
  } else {
    tips.push("✨ Buen manejo del estrés, sigue cuidándote.");
  }

  // 💔 2. Estado de ánimo
  if (mood <= 2) {
    tips.push("💛 Está bien tener un día gris. No te exijas estar bien todo el tiempo.");
  } else if (mood == 3) {
    tips.push("🌥️ Estás en un punto neutro, intenta hacer algo pequeño que te guste.");
  } else {
    tips.push("🌞 Se nota que tu día va bien, aprovecha esa energía.");
  }

  // ⚡ 3. Causas del estrés
  if (causes.includes("escuela")) {
    tips.push("📚 Divide tus tareas en partes pequeñas, no todo tiene que hacerse hoy.");
  }

  if (causes.includes("tiempo")) {
    tips.push("⏰ Organiza tu día en bloques, incluso descansos.");
  }

  if (causes.includes("cansancio")) {
    tips.push("😴 Tu cuerpo pide descanso. Dormir bien también es productividad.");
  }

  if (causes.includes("redes")) {
    tips.push("📵 Aléjate un rato de redes, tu mente lo va a agradecer.");
  }

  if (causes.includes("personales")) {
    tips.push("🫂 Hablar con alguien de confianza puede ayudarte a soltar lo que sientes.");
  }

  // 🧩 4. Reacciones
  if (reactions.includes("guardo")) {
    tips.push("💬 Guardarte todo puede hacer que pese más. Intenta escribirlo o hablarlo.");
  }

  if (reactions.includes("aislo")) {
    tips.push("🌱 Aislarte a veces ayuda, pero no te quedes ahí mucho tiempo.");
  }

  if (reactions.includes("telefono")) {
    tips.push("📱 Distracciones ayudan, pero también necesitas conectar contigo.");
  }

  // 🫶 5. Lo que necesitas
  if (reactions.includes("abrazo")) {
    tips.push("🤍 A veces lo único que necesitas es sentir apoyo, no estás solo.");
  }

  if (reactions.includes("llorar")) {
    tips.push("😭 Llorar también es una forma de liberar lo que llevas dentro.");
  }

  if (reactions.includes("descansar")) {
    tips.push("🛌 Descansar no es perder el tiempo, es recargar energía.");
  }

  if (reactions.includes("actividad")) {
    tips.push("🎨 Intenta hacer algo diferente, cambiar la rutina ayuda mucho.");
  }

  // 🧾 Mostrar tips
  const fragment = document.createDocumentFragment();
  const colors = ['card-green', 'card-brown', 'card-purple', 'card-pink', 'card-yellow', 'card-cyan'];

  tips.forEach((tip, index) => {
    const card = document.createElement('div');
    const colorClass = colors[index % colors.length];
    card.className = `tip-card ${colorClass}`;

    const heading = document.createElement('h3');
    heading.textContent = 'Tip Personalizado';

    const paragraph = document.createElement('p');
    paragraph.textContent = tip;

    card.appendChild(heading);
    card.appendChild(paragraph);
    fragment.appendChild(card);
  });

  // Separador
  const separador = document.createElement('div');
  separador.className = 'tip-card';
  separador.style.gridColumn = '1 / -1';
  separador.style.background = 'rgba(0,0,0,0.05)';
  separador.style.borderTop = '2px solid rgba(0,0,0,0.2)';
  separador.style.borderBottom = '2px solid rgba(0,0,0,0.2)';
  separador.style.padding = '15px';
  separador.style.textAlign = 'center';
  
  const separadorText = document.createElement('p');
  separadorText.textContent = '✨ Tips más generales que también te pueden ayudar ✨';
  separadorText.style.fontWeight = 'bold';
  separadorText.style.margin = '0';
  separador.appendChild(separadorText);

  fragment.appendChild(separador);

  contenedor.prepend(fragment);
});