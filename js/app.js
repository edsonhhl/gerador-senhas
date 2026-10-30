'use strict';
const groups = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%&*?_-+'
};
const passwordOutput = document.querySelector('#password');
const lengthInput = document.querySelector('#length');
const lengthValue = document.querySelector('#length-value');
const status = document.querySelector('#status');
const groupInputs = Object.keys(groups).map(id => document.getElementById(id));

// Rejection sampling prevents modulo bias when choosing characters.
function secureIndex(max) {
  const bound = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  let number;
  do {
    crypto.getRandomValues(buffer);
    number = buffer[0];
  } while (number >= bound);
  return number % max;
}
function generatePassword() {
  const selected = groupInputs.filter(input => input.checked).map(input => groups[input.id]);
  if (!selected.length) {
    passwordOutput.textContent = 'Selecione pelo menos uma opção';
    status.textContent = '';
    return;
  }
  const size = Number(lengthInput.value);
  const alphabet = selected.join('');
  const chars = selected.map(group => group[secureIndex(group.length)]);
  while (chars.length < size) chars.push(alphabet[secureIndex(alphabet.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  passwordOutput.textContent = chars.join('');
  status.textContent = '';
}
lengthInput.addEventListener('input', () => {
  lengthValue.textContent = `${lengthInput.value} caracteres`;
});
document.querySelector('#generate').addEventListener('click', generatePassword);
document.querySelector('#copy').addEventListener('click', async () => {
  const value = passwordOutput.textContent;
  if (!value || value === 'Clique em Gerar senha' || value.startsWith('Selecione')) {
    status.textContent = 'Gere uma senha primeiro.';
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
    status.textContent = 'Senha copiada!';
  } catch {
    status.textContent = 'Não foi possível copiar automaticamente. Selecione a senha e copie manualmente.';
  }
});
groupInputs.forEach(input => input.addEventListener('change', () => {
  if (groupInputs.some(item => item.checked)) generatePassword();
  else { passwordOutput.textContent = 'Selecione pelo menos uma opção'; status.textContent = ''; }
}));
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
generatePassword();
