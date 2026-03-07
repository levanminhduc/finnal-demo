requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const notifs = getAll('notifications');
  const container = document.getElementById('notifList');
  if (!notifs.length) {
    container.innerHTML = '<p class="text-sm text-slate-400">Chưa có thông báo nào.</p>';
    return;
  }
  const sorted = [...notifs].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  container.innerHTML = sorted.map(n => `
    <div class="bg-white rounded-md shadow p-4">
      <div class="flex justify-between items-start mb-1">
        <h3 class="font-semibold text-slate-800">${n.title || '—'}</h3>
        <span class="text-xs text-slate-400 shrink-0 ml-3">${formatDate(n.date)}</span>
      </div>
      <p class="text-sm text-slate-600">${n.content || '—'}</p>
    </div>
  `).join('');
}

renderList();
