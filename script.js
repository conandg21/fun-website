:root{
  --bg: #0f1724;
  --card: #0b1220;
  --accent: #7dd3fc;
  --muted: #94a3b8;
  --ok: #34d399;
  --warn: #fbbf24;
  --bad: #fb7185;
  --glass: rgba(255,255,255,0.03);
  --radius: 12px;
  --max-width: 720px;
}

*{box-sizing:border-box;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif}
html,body{height:100%;margin:0;background:linear-gradient(180deg,#081226 0%, #071025 100%);color:#e6eef8}
.wrap{max-width:var(--max-width);margin:36px auto;padding:20px}
.hero{text-align:center;margin-bottom:18px}
.hero h1{margin:0;font-size:clamp(1.4rem, 3vw, 2rem)}
.hero .subtitle{color:var(--muted);margin-top:6px;font-size:0.95rem}

.card{background:var(--card);padding:18px;border-radius:var(--radius);box-shadow:0 6px 24px rgba(1,6,16,0.6)}
.label{display:block;margin-bottom:8px;color:var(--muted)}
.input-row{display:flex;gap:8px;align-items:center}
.input-row input{flex:1;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.03);background:var(--glass);color:inherit;font-size:1rem;outline:none}
.input-row input::placeholder{color:#6f8aa1}
.btn{padding:10px 14px;border-radius:10px;border:0;background:linear-gradient(180deg,var(--accent),#38bdf8);color:#022026;cursor:pointer;font-weight:600}
.btn.alt{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--accent)}
.btn.tiny{padding:8px 10px;font-size:0.9rem}
.controls{display:flex;gap:8px;margin-top:12px}
.meter{height:12px;background:rgba(255,255,255,0.04);border-radius:10px;margin-top:16px;overflow:hidden}
.meter-fill{height:100%;width:0%;transition:width 250ms ease, background 250ms ease}
.strength{margin:10px 0 0;color:var(--muted);font-weight:600}
.suggestions{margin:10px 0 0;padding-left:18px;color:var(--muted);line-height:1.5}
.foot{color:var(--muted);text-align:center;margin-top:16px;font-size:0.9rem}

/* color classes for meter */
.fill-very-weak{background:linear-gradient(90deg,#ff6b6b,#fb7185)}
.fill-weak{background:linear-gradient(90deg,#fb7185,#fb923c)}
.fill-medium{background:linear-gradient(90deg,#fbbf24,#f59e0b)}
.fill-strong{background:linear-gradient(90deg,#84cc16,#34d399)}
.fill-very-strong{background:linear-gradient(90deg,#34d399,#10b981)}

/* responsive */
@media (max-width:520px){
  .controls{flex-direction:column}
  .input-row{flex-direction:column}
  .input-row input{width:100%}
}
