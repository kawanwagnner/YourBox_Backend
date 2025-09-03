async function api(path, opts = {}) {
  const base = '';
  const res = await fetch(base + path, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }
  return res.json();
}

// Auth forms
async function onRegister(e) {
  e.preventDefault();
  const form = e.target;
  const data = { name: form.name.value, email: form.email.value, password: form.password.value };
  try {
    const r = await api('/api/auth/register', { method: 'POST', body: JSON.stringify(data) });
    window.location.href = '/';
  } catch (err) {
    alert(err?.error?.message || JSON.stringify(err));
  }
}

async function onLogin(e) {
  e.preventDefault();
  const form = e.target;
  const data = { email: form.email.value, password: form.password.value };
  try {
    await api('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
    window.location.href = '/dashboard';
  } catch (err) {
    alert(err?.error?.message || JSON.stringify(err));
  }
}

// Dashboard actions
async function loadSpaces() {
  try {
    const spaces = await api('/api/spaces');
    const list = document.getElementById('spacesList');
    list.innerHTML = '';
    spaces.forEach(s => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="/space/${s.id}">${s.name}</a>`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

async function onCreateSpace(e) {
  e.preventDefault();
  const name = document.getElementById('spaceName').value;
  try {
    await api('/api/spaces', { method: 'POST', body: JSON.stringify({ name }) });
    loadSpaces();
  } catch (err) {
    alert(err?.error?.message || JSON.stringify(err));
  }
}

// Space page
async function loadSpace(spaceId) {
  try {
    const space = await api('/api/spaces/' + spaceId);
    document.getElementById('spaceTitle').innerText = space.name;
    const items = await api('/api/spaces/' + spaceId + '/items');
    const list = document.getElementById('itemsList');
    list.innerHTML = '';
    items.forEach(it => {
      const li = document.createElement('li');
      li.innerText = it.content || it.fileUrl || 'empty';
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

async function onCreateItem(e, spaceId) {
  e.preventDefault();
  const content = document.getElementById('itemContent').value;
  try {
    await api('/api/spaces/' + spaceId + '/items', { method: 'POST', body: JSON.stringify({ content }) });
    loadSpace(spaceId);
  } catch (err) {
    alert(err?.error?.message || JSON.stringify(err));
  }
}

window.app = { onRegister, onLogin, loadSpaces, onCreateSpace, loadSpace, onCreateItem };
