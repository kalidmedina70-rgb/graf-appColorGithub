// Clamp
const clamp255 = (n) => Math.max(0, Math.min(255, Number(n) || 0));

// Sliders
const rangeR = document.getElementById("rangeR");
const rangeG = document.getElementById("rangeG");
const rangeB = document.getElementById("rangeB");

// Inputs numéricos
const inputR = document.getElementById("inputR");
const inputG = document.getElementById("inputG");
const inputB = document.getElementById("inputB");

// Color picker
const colorPicker = document.getElementById("colorPicker");

// Labels
const valR = document.getElementById("valR");
const valG = document.getElementById("valG");
const valB = document.getElementById("valB");

// Outputs
const preview = document.getElementById("preview");
const hexOutput = document.getElementById("hexOutput");
const rgbOutput = document.getElementById("rgbOutput");

// Botones
const btnReset = document.getElementById("btnReset");
const btnRandom = document.getElementById("btnRandom");
const copyHex = document.getElementById("copyHex");
const copyRgb = document.getElementById("copyRgb");

function toHex(r, g, b) {
  return (
    "#" +
    [r, g, b].map((v) => clamp255(v).toString(16).padStart(2, "0")).join("")
  ).toUpperCase();
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function updateUI() {
  const r = clamp255(rangeR.value);
  const g = clamp255(rangeG.value);
  const b = clamp255(rangeB.value);

  // sincronizar inputs
  inputR.value = r;
  inputG.value = g;
  inputB.value = b;

  valR.textContent = r;
  valG.textContent = g;
  valB.textContent = b;

  const hex = toHex(r, g, b);
  const rgb = `rgb(${r}, ${g}, ${b})`;

  preview.style.backgroundColor = hex;
  hexOutput.value = hex;
  rgbOutput.value = rgb;

  // sincronizar picker
  colorPicker.value = hex;
}

// --- Eventos ---
// Sliders
[rangeR, rangeG, rangeB].forEach((slider) =>
  slider.addEventListener("input", updateUI)
);

// Inputs numéricos
[inputR, inputG, inputB].forEach((input, idx) => {
  input.addEventListener("input", () => {
    const val = clamp255(input.value);
    if (idx === 0) rangeR.value = val;
    if (idx === 1) rangeG.value = val;
    if (idx === 2) rangeB.value = val;
    updateUI();
  });
});

// Color picker
colorPicker.addEventListener("input", () => {
  const { r, g, b } = hexToRgb(colorPicker.value);
  rangeR.value = r;
  rangeG.value = g;
  rangeB.value = b;
  updateUI();
});

// Botón Reiniciar
btnReset.addEventListener("click", () => {
  [rangeR, rangeG, rangeB].forEach((s) => (s.value = 0));
  updateUI();
});

// Botón Aleatorio
btnRandom.addEventListener("click", () => {
  rangeR.value = Math.floor(Math.random() * 256);
  rangeG.value = Math.floor(Math.random() * 256);
  rangeB.value = Math.floor(Math.random() * 256);
  updateUI();
});

// Copiar al portapapeles
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "¡Copiado!";
    setTimeout(() => (btn.textContent = original), 900);
  });
}
copyHex.addEventListener("click", () => copyToClipboard(hexOutput.value, copyHex));
copyRgb.addEventListener("click", () => copyToClipboard(rgbOutput.value, copyRgb));

// Inicializar
updateUI();


