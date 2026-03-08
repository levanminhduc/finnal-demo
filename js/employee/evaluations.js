requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const evals = getAll('evaluations').filter(e => e.employeeId === emp.id);
  const tbody = document.getElementById('evalTableBody');
  if (!evals.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-white rounded-b-3xl border-t border-slate-100">Chưa có kết quả đánh giá nào.</td></tr>';
    return;
  }
  tbody.innerHTML = evals.map(ev => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-black text-slate-900 tracking-tight">${ev.period || '—'}</td>
      <td class="px-6 py-4 text-sm font-medium">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center font-black border border-primary-100">
            ${ev.score ?? '—'}
          </div>
          <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">/ 10 điểm</span>
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-slate-600 font-medium italic">"${ev.comment || '—'}"</td>
    </tr>
  `).join('');
}

renderList();
