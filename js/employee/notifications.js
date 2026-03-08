requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const notifs = getAll('notifications');
  const container = document.getElementById('notifList');
  if (!notifs.length) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Chưa có thông báo nào.</p></div>';
    return;
  }
  const sorted = [...notifs].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  container.innerHTML = sorted.map(n => `
    <div class="card bg-white hover:scale-[1.01] transition-all duration-300 group">
      <div class="flex gap-4">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors shadow-sm">
          ${ICONS.notifications}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start mb-1">
            <h3 class="font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors truncate pr-4">${n.title || '—'}</h3>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">${formatDate(n.date)}</span>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed font-medium">${n.content || '—'}</p>
        </div>
      </div>
    </div>
  `).join('');
}

renderList();
