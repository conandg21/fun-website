// All client-side — nothing is sent anywhere.
// Simple password-strength heuristics with helpful suggestions.

const pwd = document.getElementById('password');
const toggle = document.getElementById('toggle');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const meterFill = document.getElementById('meter-fill');
const strengthText = document.getElementById('strength-text');
const suggestionsList = document.getElementById('suggestions');

pwd.addEventListener('input', updateUI);
toggle.addEventListener('click', toggleShow);
generateBtn.addEventListener('click', () => {
  const p = generatePassword(16);
  pwd.value = p;
  updateUI();
});
copyBtn.addEventListener('click', () => {
  if (!pwd.value) return;
  navigator.clipboard?.writeText(pwd.value).then(()=> {
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1500);
  }).catch(()=> alert('Copy failed — select and press Ctrl/Cmd+C'));
});

// initial
updateUI();

function toggleShow(){
  const isHidden = pwd.type === 'password';
  pwd.type = isHidden ? 'text' : 'password';
  toggle.textContent = isHidden ? 'Hide' : 'Show';
  toggle.setAttribute('aria-pressed', String(isHidden));
}

function updateUI(){
  const val = pwd.value || '';
  const info = evaluatePassword(val);

  // update meter
  meterFill.style.width = info.percent + '%';
  meterFill.className = 'meter-fill ' + info.className;

  // update text
  strengthText.textContent = info.verdict + (val ? ` — ${info.details}` : '');
  
  // update suggestions
  suggestionsList.innerHTML = '';
  info.suggestions.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    suggestionsList.appendChild(li);
  });
}

/** Evaluate password and return UI helpers */
function evaluatePassword(p){
  if (!p) {
    return {
      score: 0, percent: 0, className: 'fill-very-weak',
      verdict: 'Empty',
      details: 'Type a password to see strength.',
      suggestions: ['Type a password to see suggestions.']
    };
  }

  let score = 0;
  const len = p.length;

  // length buckets
  if (len >= 8) score += 1;
  if (len >= 12) score += 1;
  if (len >= 16) score += 1;

  // char variety
  const lower = /[a-z]/.test(p);
  const upper = /[A-Z]/.test(p);
  const digit = /\d/.test(p);
  const special = /[^A-Za-z0-9]/.test(p);

  if (lower) score++;
  if (upper) score++;
  if (digit) score++;
  if (special) score++;

  // penalties for obvious weak patterns
  let penalties = 0;
  if (/(.)\1\1/.test(p)) penalties += 1; // triple repeated char
  const commons = ['password','12345','123456','qwerty','abc123','letmein','admin','welcome','iloveyou'];
  for (const c of commons) if (p.toLowerCase().includes(c)) penalties += 2;

  score = score - penalties;
  score = Math.max(0, Math.min(8, score));

  const percent = Math.round((score / 8) * 100);

  // verdict mapping
  let verdict = 'Very weak';
  let className = 'fill-very-weak';
  if (percent >= 86) { verdict = 'Very strong'; className = 'fill-very-strong'; }
  else if (percent >= 61) { verdict = 'Strong'; className = 'fill-strong'; }
  else if (percent >= 36) { verdict = 'Medium'; className = 'fill-medium'; }
  else if (percent >= 16) { verdict = 'Weak'; className = 'fill-weak'; }
  else { verdict = 'Very weak'; className = 'fill-very-weak'; }

  // friendly details
  const details = `${percent}%`;

  // tailored suggestions
  const suggestions = [];
  if (len < 12) suggestions.push('Make it longer — aim for at least 12 characters.');
  if (!lower) suggestions.push('Add lowercase letters.');
  if (!upper) suggestions.push('Add uppercase letters.');
  if (!digit) suggestions.push('Include numbers (0–9).');
  if (!special) suggestions.push('Include symbols like ! @ # $ % & *.');
  if (/(.)\1\1/.test(p)) suggestions.push('Avoid repeated characters (aaa or 111).');
  for (const c of commons) if (p.toLowerCase().includes(c)) suggestions.push('Avoid common words, sequences, or simple patterns.');

  if (suggestions.length === 0) suggestions.push('Nice! Consider using a passphrase (random words) for even better memorability + strength.');

  return { score, percent, className, verdict, details, suggestions };
}

/** Generate a cryptographically random password */
function generatePassword(length = 16){
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
  const arr = new Uint32Array(length);
  window.crypto.getRandomValues(arr);
  let out = '';
  for (let i = 0; i < length; i++){
    out += charset[arr[i] % charset.length];
  }
  return out;
}
