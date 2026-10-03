import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './karyakartha.css';
import {
  ROLES, LEADERS, LEADER_NEWS, CONSTITUENCY,
  DAILY_TASKS, PULSE, STRATEGIES, CAREER_LADDER,
} from './data';

const PROFILE_KEY = 'karyakartha_profile';
const TASKS_KEY = 'karyakartha_tasks_done';

function readJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}

function taskScore() {
  const done = readJSON(TASKS_KEY, {});
  return DAILY_TASKS.filter((t) => done[t.id]).reduce((s, t) => s + t.points, 0);
}

/* ---------------- Login ---------------- */
function KLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', phone: '', role: ROLES[0],
    constituency: CONSTITUENCY.name, leader: 'ktr',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(form)); } catch (err) {}
    navigate('/karyakartha/dashboard');
  };
  return (
    <div className="k-login-wrap">
      <div className="k-login-card">
        <div className="k-brand">BRS Karyakartha</div>
        <p className="text-muted">Login to open your personal party workspace.</p>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Your name</label>
            <input className="form-control" value={form.name} onChange={set('name')} placeholder="e.g. Naresh Nalla" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile number</label>
            <input className="form-control" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Your role</label>
              <select className="form-select" value={form.role} onChange={set('role')}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Constituency</label>
              <select className="form-select" value={form.constituency} onChange={set('constituency')}>
                <option value={CONSTITUENCY.name}>{CONSTITUENCY.name} ({CONSTITUENCY.district})</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Leader you follow</label>
            <select className="form-select" value={form.leader} onChange={set('leader')}>
              {LEADERS.map((l) => <option key={l.id} value={l.id}>{l.name} ({l.short})</option>)}
            </select>
          </div>
          <button type="submit" className="btn w-100 text-white" style={{ background: '#ec008c' }}>
            Enter my workspace
          </button>
        </form>
        <p className="k-demo-note">Demo login for the prototype - no OTP or server. Your profile stays in this browser only.</p>
      </div>
    </div>
  );
}

/* ---------------- Layout with pink nav ---------------- */
function KLayout({ children }) {
  const profile = readJSON(PROFILE_KEY, null);
  const navigate = useNavigate();
  if (!profile) return <Navigate to="/karyakartha/login" replace />;
  const logout = () => {
    try { localStorage.removeItem(PROFILE_KEY); } catch (e) {}
    navigate('/karyakartha/login');
  };
  const links = [
    ['/karyakartha/dashboard', 'Dashboard'],
    ['/karyakartha/leader', 'My Leader'],
    ['/karyakartha/constituency', 'Constituency'],
    ['/karyakartha/tasks', 'Daily Work'],
    ['/karyakartha/pulse', 'Public Pulse'],
    ['/karyakartha/strategies', 'Strategies'],
    ['/karyakartha/career', 'Career Path'],
  ];
  return (
    <div className="k-app">
      <nav className="navbar navbar-expand-lg k-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/karyakartha/dashboard">BRS Karyakartha</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#kNav" aria-controls="kNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="kNav">
            <ul className="navbar-nav me-auto">
              {links.map(([to, label]) => (
                <li className="nav-item" key={to}>
                  <Link className="nav-link" to={to}>{label}</Link>
                </li>
              ))}
            </ul>
            <span className="navbar-text text-white me-3">{profile.name} - {profile.role}</span>
            <button className="btn btn-sm btn-light" onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container py-3">{children}</div>
    </div>
  );
}

/* ---------------- Dashboard home ---------------- */
function KDashboard() {
  const profile = readJSON(PROFILE_KEY, {});
  const leader = LEADERS.find((l) => l.id === profile.leader) || LEADERS[1];
  const done = readJSON(TASKS_KEY, {});
  const doneCount = DAILY_TASKS.filter((t) => done[t.id]).length;
  const news = (LEADER_NEWS[leader.id] || []).slice(0, 2);
  return (
    <div>
      <h4>Jai Telangana, {profile.name || 'Karyakartha'}!</h4>
      <p className="text-muted">{profile.role} - {profile.constituency} - Following {leader.short}</p>
      <div className="row g-3 mb-3">
        <div className="col-6 col-md-3"><div className="card k-stat p-3"><div className="num">{taskScore()}</div><div className="text-muted small">Seva points</div></div></div>
        <div className="col-6 col-md-3"><div className="card k-stat p-3"><div className="num">{doneCount}/{DAILY_TASKS.length}</div><div className="text-muted small">Tasks today</div></div></div>
        <div className="col-6 col-md-3"><div className="card k-stat p-3"><div className="num">12</div><div className="text-muted small">Day streak (demo)</div></div></div>
        <div className="col-6 col-md-3"><div className="card k-stat p-3"><div className="num">#7</div><div className="text-muted small">Mandal rank (demo)</div></div></div>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card k-card">
            <div className="card-header">{leader.short} - latest <span className="k-tag dim">demo</span></div>
            <div className="card-body">
              {news.map((n, i) => (
                <div className="k-news-item" key={i}>
                  <span className="k-tag">{n.tag}</span>
                  <div className="fw-semibold">{n.title}</div>
                  <small className="text-muted">{n.time}</small>
                </div>
              ))}
              <Link to="/karyakartha/leader" className="btn btn-sm mt-2 text-white" style={{ background: '#ec008c' }}>Full feed</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card k-card">
            <div className="card-header">Public pulse <span className="k-tag dim">demo</span></div>
            <div className="card-body">
              {PULSE.sentiment.slice(0, 3).map((s) => (
                <div className="k-bar-row" key={s.party}>
                  <div className="k-bar-label">{s.party}</div>
                  <div className="k-bar-track"><div className="k-bar-fill" style={{ width: s.pct + '%' }} /></div>
                  <div className="k-bar-pct">{s.pct}%</div>
                </div>
              ))}
              <Link to="/karyakartha/pulse" className="btn btn-sm mt-2 text-white" style={{ background: '#ec008c' }}>Pulse details</Link>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mt-4 mb-2">Quick actions</h6>
      <div className="row g-2">
        {[
          ['/karyakartha/tasks', 'Daily work'],
          ['/karyakartha/constituency', 'My constituency'],
          ['/karyakartha/strategies', 'Playbooks'],
          ['/karyakartha/career', 'My career path'],
        ].map(([to, label]) => (
          <div className="col-6 col-md-3" key={to}><Link className="k-quick" to={to}>{label}</Link></div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- My Leader ---------------- */
function KLeader() {
  const profile = readJSON(PROFILE_KEY, {});
  const [sel, setSel] = useState(profile.leader || 'ktr');
  const leader = LEADERS.find((l) => l.id === sel) || LEADERS[0];
  return (
    <div>
      <h4>My Leader</h4>
      <div className="mb-3">
        <select className="form-select" value={sel} onChange={(e) => setSel(e.target.value)} style={{ maxWidth: 320 }}>
          {LEADERS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>
      <div className="card k-card mb-3">
        <div className="card-body">
          <h5>{leader.name} <span className="k-tag">{leader.short}</span></h5>
          <p className="mb-1"><strong>{leader.role}</strong></p>
          <p className="text-muted mb-0">{leader.note}</p>
        </div>
      </div>
      <div className="card k-card">
        <div className="card-header">News and updates <span className="k-tag dim">demo feed</span></div>
        <div className="card-body">
          {(LEADER_NEWS[sel] || []).map((n, i) => (
            <div className="k-news-item" key={i}>
              <span className="k-tag">{n.tag}</span>
              <div className="fw-semibold">{n.title}</div>
              <small className="text-muted">{n.time} - sample headline for the prototype</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Constituency ---------------- */
function KConstituency() {
  const c = CONSTITUENCY;
  return (
    <div>
      <h4>{c.name} Constituency <span className="k-real">real data</span></h4>
      <p className="text-muted">No. {c.number} - {c.district} district - {c.lokSabha} Lok Sabha - {c.electors} electors</p>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="card k-card h-100">
            <div className="card-header">Your MLA <span className="k-real">2023</span></div>
            <div className="card-body">
              <h5>{c.mla} <span className="k-tag">{c.mlaParty}</span></h5>
              <p className="mb-1">2023 votes: <strong>{c.result2023.brsVotes.toLocaleString('en-IN')}</strong> ({c.result2023.brsPct}%)</p>
              <p className="mb-1">Runner-up: {c.result2023.runnerUp} - {c.result2023.runnerUpVotes.toLocaleString('en-IN')} votes</p>
              <p className="mb-1">Victory margin: <strong>{c.result2023.margin.toLocaleString('en-IN')}</strong> votes</p>
              <small className="text-muted">Earlier MLA: {c.prevMla}</small>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card k-card h-100">
            <div className="card-header">Mandals <span className="k-real">real</span></div>
            <div className="card-body">
              <ul className="mb-0">{c.mandals.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
      <div className="card k-card mb-3">
        <div className="card-header">Key local issues</div>
        <div className="card-body">
          {c.issues.map((it) => (
            <div className="k-news-item" key={it.title}>
              <span className="k-tag">{it.heat} priority</span>
              <div className="fw-semibold">{it.title}</div>
              <small className="text-muted">{it.detail}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="card k-card">
        <div className="card-header">Promise tracker <span className="k-tag dim">demo</span></div>
        <div className="card-body">
          {c.promises.map((p, i) => (
            <div className="k-news-item" key={i}>
              <span className={p.status === 'In progress' ? 'k-tag' : 'k-tag dim'}>{p.status}</span>
              <div className="fw-semibold">{p.promise}</div>
              <small className="text-muted">{p.note} - verify with real sources before handover</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Daily work ---------------- */
function KTasks() {
  const [done, setDone] = useState(() => readJSON(TASKS_KEY, {}));
  const toggle = (id) => {
    const n = { ...done, [id]: !done[id] };
    setDone(n);
    try { localStorage.setItem(TASKS_KEY, JSON.stringify(n)); } catch (e) {}
  };
  const doneCount = DAILY_TASKS.filter((t) => done[t.id]).length;
  return (
    <div>
      <h4>Daily Work</h4>
      <p className="text-muted">Complete tasks, earn seva points. Your progress is saved in this browser.</p>
      <div className="card k-card mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <strong>Today&apos;s score</strong>
            <div className="text-muted small">{doneCount}/{DAILY_TASKS.length} tasks done</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ec008c' }}>{taskScore()} pts</div>
        </div>
      </div>
      <div className="card k-card">
        <div className="card-body">
          {DAILY_TASKS.map((t) => (
            <label className={'k-task' + (done[t.id] ? ' done' : '')} key={t.id}>
              <input type="checkbox" checked={!!done[t.id]} onChange={() => toggle(t.id)} />
              <div>
                <div className="k-task-title fw-semibold">{t.title}</div>
                <small className="text-muted">{t.detail}</small>
              </div>
              <span className="k-points">+{t.points}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Public pulse ---------------- */
function KPulse() {
  return (
    <div>
      <h4>Public Pulse <span className="k-tag dim">demo</span></h4>
      <p className="text-muted">{PULSE.updated}</p>
      <div className="card k-card mb-3">
        <div className="card-header">Party sentiment - {CONSTITUENCY.name}</div>
        <div className="card-body">
          {PULSE.sentiment.map((s) => (
            <div className="k-bar-row" key={s.party}>
              <div className="k-bar-label">{s.party}</div>
              <div className="k-bar-track"><div className="k-bar-fill" style={{ width: s.pct + '%' }} /></div>
              <div className="k-bar-pct">{s.pct}%</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card k-card mb-3">
        <div className="card-header">What people are talking about</div>
        <div className="card-body">
          {PULSE.topIssues.map((t) => (
            <div className="k-bar-row" key={t.issue}>
              <div className="k-bar-label" style={{ width: 140 }}>{t.issue}</div>
              <div className="k-bar-track"><div className="k-bar-fill" style={{ width: Math.min(100, t.mentions) + '%' }} /></div>
              <div className="k-bar-pct">{t.mentions}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="alert" style={{ background: '#fdf0f7', border: '1px solid #f3d3e6' }}>
        <strong>Ground mood:</strong> {PULSE.mood}
      </div>
    </div>
  );
}

/* ---------------- Strategies ---------------- */
function KStrategies() {
  const [open, setOpen] = useState('s1');
  return (
    <div>
      <h4>Strategies and Playbooks</h4>
      <p className="text-muted">Field-tested guidance for every role. Tap a playbook to open it.</p>
      {STRATEGIES.map((s) => (
        <div className="card k-card mb-2" key={s.id}>
          <div className="card-header d-flex justify-content-between align-items-center" onClick={() => setOpen(open === s.id ? '' : s.id)} style={{ cursor: 'pointer' }}>
            <span>{s.title} <span className="k-tag dim">{s.forRole}</span></span>
            <span>{open === s.id ? '-' : '+'}</span>
          </div>
          {open === s.id && (
            <div className="card-body">
              <ol className="mb-2">{s.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
              <p className="mb-0"><em>&quot;{s.tip}&quot;</em></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Career path ---------------- */
function KCareer() {
  return (
    <div>
      <h4>My Career Path</h4>
      <p className="text-muted">From karyakartha to legislator - every step is earned on the ground.</p>
      {CAREER_LADDER.map((c, i) => (
        <div className="k-step" key={c.stage}>
          <h6>Step {i + 1}: {c.stage} - {c.title}</h6>
          <ul className="mb-1">{c.needs.map((n, j) => <li key={j}>{n}</li>)}</ul>
          <small className="text-muted">{c.next}</small>
        </div>
      ))}
      <div className="alert mt-3" style={{ background: '#fdf0f7', border: '1px solid #f3d3e6' }}>
        Your seva points and completed tasks on the <Link to="/karyakartha/tasks">Daily Work</Link> page are the proof of your journey. Make your work visible.
      </div>
    </div>
  );
}

/* ---------------- App with routes ---------------- */
export default function KaryakarthaApp() {
  return (
    <Routes>
      <Route path="login" element={<KLogin />} />
      <Route path="dashboard" element={<KLayout><KDashboard /></KLayout>} />
      <Route path="leader" element={<KLayout><KLeader /></KLayout>} />
      <Route path="constituency" element={<KLayout><KConstituency /></KLayout>} />
      <Route path="tasks" element={<KLayout><KTasks /></KLayout>} />
      <Route path="pulse" element={<KLayout><KPulse /></KLayout>} />
      <Route path="strategies" element={<KLayout><KStrategies /></KLayout>} />
      <Route path="career" element={<KLayout><KCareer /></KLayout>} />
      <Route path="*" element={<Navigate to="/karyakartha/login" replace />} />
    </Routes>
  );
}
