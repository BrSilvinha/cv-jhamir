/* ============================================================
   EASTER EGG — Konami code triggers a hidden terminal
   Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
   ============================================================ */
const KONAMI = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a'
];

const COMMANDS = {
    help: `Comandos disponibles:
  <span class="t-cmd">whoami</span>       — info sobre Jhamir
  <span class="t-cmd">skills</span>       — stack tecnológico
  <span class="t-cmd">contact</span>      — cómo contactarme
  <span class="t-cmd">clear</span>        — limpiar terminal
  <span class="t-cmd">exit</span>         — cerrar terminal`,

    whoami: `<span class="t-highlight">Jhamir Alexander Silva Baldera</span>
  · 21 años · Motupe, Lambayeque, Perú
  · Ingeniería de Sistemas — USS (Décimo Ciclo)
  · Freelance Full Stack Developer
  · +50 clientes atendidos
  · "I turn coffee into code" ☕`,

    skills: `<span class="t-highlight">Stack principal:</span>
  PHP · TypeScript · Python · Java · Go · C#
  Laravel · React · Node.js · Tailwind
  MySQL · PostgreSQL · Docker · Git`,

    contact: `<span class="t-highlight">Encuéntrame en:</span>
  📧  jhamirsilva@gmail.com
  🐙  github.com/BrSilvinha
  💬  wa.me/51982566142`,

    clear: '__CLEAR__',
    exit:  '__EXIT__',
};

export function initEasterEgg() {
    let seq = [];
    const overlay = document.getElementById('terminal-overlay');
    const output  = document.getElementById('terminal-output');
    const input   = document.getElementById('terminal-input');
    if (!overlay || !output || !input) return;

    /* Listen for Konami sequence */
    document.addEventListener('keydown', (e) => {
        seq.push(e.key);
        if (seq.length > KONAMI.length) seq.shift();
        if (seq.join(',') === KONAMI.join(',')) openTerminal();
    });

    /* Close button */
    document.getElementById('terminal-close')?.addEventListener('click', closeTerminal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeTerminal(); });

    /* Input handling */
    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const cmd = input.value.trim().toLowerCase();
        input.value = '';
        if (!cmd) return;
        appendLine(`<span class="t-prompt">jhamir@portfolio:~$</span> ${cmd}`);
        runCommand(cmd);
    });

    function runCommand(cmd) {
        const result = COMMANDS[cmd];
        if (!result) {
            appendLine(`<span class="t-err">command not found: ${cmd}. Type <span class="t-cmd">help</span> for options.</span>`);
        } else if (result === '__CLEAR__') {
            output.innerHTML = '';
        } else if (result === '__EXIT__') {
            closeTerminal();
        } else {
            appendLine(result);
        }
    }

    function appendLine(html) {
        const p = document.createElement('p');
        p.innerHTML = html;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }

    function openTerminal() {
        overlay.classList.add('visible');
        output.innerHTML = '';
        appendLine(`<span class="t-highlight">¡Encontraste el easter egg! 🎉</span>`);
        appendLine(`Escribe <span class="t-cmd">help</span> para ver los comandos.`);
        setTimeout(() => input.focus(), 50);
        seq = [];
    }

    function closeTerminal() {
        overlay.classList.remove('visible');
    }
}
