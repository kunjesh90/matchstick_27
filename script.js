const remainingEl = document.getElementById('remaining');
const userMoveEl = document.getElementById('user-move');
const takeBtn = document.getElementById('take-btn');
const logEl = document.getElementById('log');

let remaining = 27;

function log(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  logEl.prepend(p);
}

takeBtn.addEventListener('click', async () => {
  const userMove = parseInt(userMoveEl.value);
  if (userMove > remaining) {
    log(`Invalid move: only ${remaining} sticks left.`);
    return;
  }
  try {
    const res = await fetch('/api/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remaining, user_move: userMove })
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    remaining = data.remaining;
    remainingEl.textContent = remaining;
    log(`You took ${userMove}. AI took ${data.ai_move}.`);
    if (data.game_over) {
      log(data.ai_lost ? 'AI took the last stick. You WIN!' : 'You took the last stick. You LOSE!');
      takeBtn.disabled = true;
    }
  } catch (err) {
    console.error(err);
    log('An error occurred. See console for details.');
  }
});
