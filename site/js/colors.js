// Sistema de Cores - Maquineta Stone (Ton)
const systemColors = {
  primary: '#00D700',
  secondary: '#003c00',
  dark: '#000000',
  light: '#C9FFC9',
  mid: '#006E00',
  textMain: '#1a1a1a',
  textLight: '#ffffff',
  whatsappStart: '#00D700',
  whatsappEnd: '#003c00',
  bgLight: '#f4fff4',
  bgDark: '#000000',
};

// Aplica as variáveis CSS no :root
(function applyColors() {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', systemColors.primary);
  root.style.setProperty('--color-secondary', systemColors.secondary);
  root.style.setProperty('--color-dark', systemColors.dark);
  root.style.setProperty('--color-light', systemColors.light);
  root.style.setProperty('--color-mid', systemColors.mid);
  root.style.setProperty('--color-text', systemColors.textMain);
  root.style.setProperty('--color-bg-light', systemColors.bgLight);
  root.style.setProperty('--whatsapp-start', systemColors.whatsappStart);
  root.style.setProperty('--whatsapp-end', systemColors.whatsappEnd);
})();
