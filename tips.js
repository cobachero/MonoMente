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

  const tipImageMap = {
    "🧘‍♂️ Estás muy saturado/a. Tómate una pausa y aléjate un momento.": "monosaturado.png",
    "😌 Vas manejando el estrés, pero no ignores cómo te sientes.": "monoguiño.png",
    "✨ Buen manejo del estrés, sigue cuidándote.": "monocuidado.png",
    "💛 Está bien tener un día gris. No te exijas estar bien todo el tiempo.": "mono-sentimientos.png",
    "🌥️ Estás en un punto neutro. Intenta hacer algo pequeño que te guste.": "mononeutro.png",
    "🌞 Se nota que tu día va bien, aprovecha esa energía.": "monoguiño.png",
    "📚 Divide tus tareas en partes pequeñas: no todo tiene que hacerse hoy.": "monoescuela.png",
    "🧩 “Una cosa a la vez”: empieza por la primera acción (la más fácil) y ya.": "monoescuela.png",
    "⏰ Organiza tu día en bloques, incluyendo descansos.": "monotiempo.png",
    "🛑 Límite sano: Enfoque intenso 25 min + 5 min de pausa.": "monotiempo.png",
    "😴 Tu cuerpo pide descanso. Dormir bien también es productividad.": "mono-duerme.png",
    "🌙 Rutina 10 min: baja luces, estirate suave y toma agua. Reduce pantallas antes de dormir.": "monocansancio.png",
    "📵 Aléjate un rato de redes: tu mente lo va a agradecer.": "monoredes.png",
    "🧠 Regla: si las abres, hazlo con intención (algo concreto) y con tiempo límite.": "monoredes.png",
    "🫂 Hablar con alguien de confianza puede ayudarte a soltar lo que sientes.": "monos-habla.png",
    "🧯 Si no quieres hablar, intenta escribir lo que te pasa tal cual durante 5 minutos.": "monos-fuego.png",
    "📝 Si buscas un consejo, escribe primero lo que necesitas y elige una idea sencilla que puedas probar.": "mono-escucha.png",
    "💡 A veces un consejo pequeño funciona mejor: enfócate en algo concreto y hazlo paso a paso.": "mono-escucha.png",
    "🫂 Hablarlo con alguien puede ayudarte a ver la situación con más calma y sentirte acompañado.": "monos-habla.png",
    "💬 Elige a alguien de confianza y dile algo como “Necesito desahogarme, ¿puedo contarte algo?”.": "monos-habla.png",
    "🚧 Ambiente tóxico: pon distancia emocional y límites claros.": "monoambiente.png",
    "🧊 Recuerda que no debes cargar con problemas de los demás.": "monos-aleja.png",
    "🗺️ Plan B: identifica un lugar/persona segura a la que puedas ir si sube el tono.": "monos-ilustracion.png",
    "💬 Guardarte todo puede hacer que pese más. Intenta escribirlo o hablarlo.": "monos-habla.png",
    "✍️ Escribe lo que sientes en un papel tal y como es, luego lo quemas": "monos-fuego.png",
    "🌱 Aislarte a veces ayuda, pero no te quedes ahí mucho tiempo.": "mono-sentimientos.png",
    "📲 Paso pequeño: envía un mensaje corto a alguien de confianza (aunque sea “¿cómo estás?”).": "mono-telefono.png",
    "📱 Es importante conectar contigo, en lugar de ver el telefono, puedes jugar con tu mascota o llamar a un amigo.": "mono-telefono.png",
    "🤍 A veces lo único que necesitas es sentir apoyo; no estás solo/a.": "mono-corazon.png",
    "🫶 Si no hay una persona cercana, pon un peluche/almohada sobre ti, cierra los ojos y respira lento 1 minuto.": "monoabrazo.png",
    "😭 Llorar también es una forma de liberar lo que llevas dentro.": "mono-llora.png",
    "🧯 Despues toma agua, lávate la cara y baja el ritmo.": "mono-lava.png",
    "🛌 Descansar no es perder el tiempo: es recargar energía.": "mono-duerme.png",
    "⏳ Si puedes: 20-30 min de siesta o “descanso profundo” (ojos cerrados, sin pantalla).": "mono-duerme.png",
    "🎨 Haz algo diferente: cambiar la rutina ayuda mucho.": "monoactividad.png",
    "🚶‍♀️ Sal a caminar, haz un dibujo, cocina algo sencillo... lo que te guste.": "monoactividad.png"
  };

  // 🧠 1. Nivel de estrés
  if (stressLevel >= 4) {
    tips.push("🧘‍♂️ Estás muy saturado/a. Tómate una pausa y aléjate un momento.");
  } else if (stressLevel == 3) {
    tips.push("😌 Vas manejando el estrés, pero no ignores cómo te sientes.");
  } else {
    tips.push("✨ Buen manejo del estrés, sigue cuidándote.");
  }

  // 💔 2. Estado de ánimo
  if (mood <= 2) {
    tips.push("💛 Está bien tener un día gris. No te exijas estar bien todo el tiempo.");
  } else if (mood == 3) {
    tips.push("🌥️ Estás en un punto neutro. Intenta hacer algo pequeño que te guste.");
  } else {
    tips.push("🌞 Se nota que tu día va bien, aprovecha esa energía.");
  }

  // ⚡ 3. Causas del estrés
  if (causes.includes("escuela")) {
    tips.push("📚 Divide tus tareas en partes pequeñas: no todo tiene que hacerse hoy.");
    tips.push("🧩 “Una cosa a la vez”: empieza por la primera acción (la más fácil) y ya.");
  }

  if (causes.includes("tiempo")) {
    tips.push("⏰ Organiza tu día en bloques, incluyendo descansos.");
    tips.push("🛑 Límite sano: Enfoque intenso 25 min + 5 min de pausa.");
  }

  if (causes.includes("cansancio")) {
    tips.push("😴 Tu cuerpo pide descanso. Dormir bien también es productividad.");
    tips.push("🌙 Rutina 10 min: baja luces, estirate suave y toma agua. Reduce pantallas antes de dormir.");
  }

  if (causes.includes("redes")) {
    tips.push("📵 Aléjate un rato de redes: tu mente lo va a agradecer.");
    tips.push("🧠 Regla: si las abres, hazlo con intención (algo concreto) y con tiempo límite.");
  }

  if (causes.includes("personales")) {
    tips.push("🫂 Hablar con alguien de confianza puede ayudarte a soltar lo que sientes.");
    tips.push("🧯 Si no quieres hablar, intenta escribir lo que te pasa tal cual durante 5 minutos.");
  }

  // Ambiente tóxico (nuevo)
  if (causes.includes("ambiente")) {
    tips.push("🚧 Ambiente tóxico: pon distancia emocional y límites claros.");
    tips.push("🧊 Recuerda que no debes cargar con problemas de los demás.");
    tips.push("🗺️ Plan B: identifica un lugar/persona segura a la que puedas ir si sube el tono." );
  }

  // 🧩 4. Reacciones
  if (reactions.includes("guardo")) {
    tips.push("💬 Guardarte todo puede hacer que pese más. Intenta escribirlo o hablarlo.");
    tips.push("✍️ Escribe lo que sientes en un papel tal y como es, luego lo quemas");
  }

  if (reactions.includes("consejo")) {
    tips.push("📝 Si buscas un consejo, escribe primero lo que necesitas y elige una idea sencilla que puedas probar.");
    tips.push("💡 A veces un consejo pequeño funciona mejor: enfócate en algo concreto y hazlo paso a paso.");
  }

  if (reactions.includes("hablarlo")) {
    tips.push("🫂 Hablarlo con alguien puede ayudarte a ver la situación con más calma y sentirte acompañado.");
    tips.push("💬 Elige a alguien de confianza y dile algo como “Necesito desahogarme, ¿puedo contarte algo?”.");
  }

  if (reactions.includes("aislo")) {
    tips.push("🌱 Aislarte a veces ayuda, pero no te quedes ahí mucho tiempo.");
    tips.push("📲 Paso pequeño: envía un mensaje corto a alguien de confianza (aunque sea “¿cómo estás?”).");
  }

  if (reactions.includes("telefono")) {
    tips.push("📱 Es importante conectar contigo, en lugar de ver el telefono, puedes jugar con tu mascota o llamar a un amigo.");
  }

  // 🫶 5. Lo que necesitas
  if (reactions.includes("abrazo")) {
    tips.push("🤍 A veces lo único que necesitas es sentir apoyo; no estás solo/a.");
    tips.push("🫶 Si no hay una persona cercana, pon un peluche/almohada sobre ti, cierra los ojos y respira lento 1 minuto." );
  }

  if (reactions.includes("llorar")) {
    tips.push("😭 Llorar también es una forma de liberar lo que llevas dentro.");
    tips.push("🧯 Despues toma agua, lávate la cara y baja el ritmo." );
  }

  if (reactions.includes("descansar")) {
    tips.push("🛌 Descansar no es perder el tiempo: es recargar energía.");
    tips.push("⏳ Si puedes: 20-30 min de siesta o “descanso profundo” (ojos cerrados, sin pantalla)." );
  }

  if (reactions.includes("actividad")) {
    tips.push("🎨 Haz algo diferente: cambiar la rutina ayuda mucho.");
    tips.push("🚶‍♀️ Sal a caminar, haz un dibujo, cocina algo sencillo... lo que te guste.");
  }


  // 🧾 Mostrar tips
  const fragment = document.createDocumentFragment();
  const colors = ['card-green', 'card-brown', 'card-purple', 'card-pink', 'card-yellow', 'card-cyan'];

  tips.forEach((tip, index) => {
    const card = document.createElement('div');
    const colorClass = colors[index % colors.length];
    card.className = `tip-card ${colorClass}`;

    const paragraph = document.createElement('p');
    paragraph.textContent = tip;

    card.appendChild(paragraph);

    const imageName = tipImageMap[tip];
    if (imageName) {
      const image = document.createElement('img');
      image.src = imageName;
      image.alt = `Imagen para tip`;
      image.className = 'card-img';
      card.appendChild(image);
    }

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
