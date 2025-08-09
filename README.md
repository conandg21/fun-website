# Password Playground

Simple client-side website that checks password strength and gives suggestions.
Everything runs in your browser — nothing is sent to any server.

## Features
- Real-time strength meter
- Suggestions to improve strength
- Generate secure password (uses `window.crypto`)
- Copy generated or typed passwords to clipboard

## How to run locally
1. Clone the repo:
2. Open `index.html` in your browser (double-click or `open index.html`).

## Deploy
Enable **GitHub Pages** in repository Settings → Pages → Branch: `main` → Folder: `/` → Save.

## License
This project is released under the MIT License — see `LICENSE`.

## Improvements (ideas)
- Integrate `zxcvbn` for deeper analysis.
- Add tests and CI.
- Make a progressive web app (PWA).
