function toggleExpand(element) {
  element.classList.toggle("expanded");
}

const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  // Größe setzen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = ['0', '1'];
  const fontSize = 10; // kleinere Schrift für mehr Spalten
  const columns = Math.floor(canvas.width / fontSize);

  // y-Position jeder Spalte
  const drops = Array(columns).fill(Math.random() * canvas.height);

  function draw() {
    // leicht transparentes Schwarz für Trail-Effekt
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#3a3a3a'; // dunkles Grau
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < columns; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      // langsamerer Fall durch geringere Wahrscheinlichkeit zum Neustart
      if (y > canvas.height && Math.random() > 0.99) {
        drops[i] = 0;
      }

      drops[i] += 0.7; // geringere Geschwindigkeit
    }
  }

  // langsamere Update-Rate für weicheren Effekt
  setInterval(draw, 75);

  // Reaktion auf Fenstergröße
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });