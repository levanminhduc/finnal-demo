requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const evals = getAll('evaluations').filter(e => e.employeeId === emp.id);
  const tbody = document.getElementById('evalTableBody');
  if (!evals.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có kết quả đánh giá</td></tr>';
    return;
  }
  tbody.innerHTML = evals.map(ev => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm font-medium">${ev.period || '—'}</td>
      <td class="px-4 py-3 text-sm">
        <span class="font-semibold text-slate-800">${ev.score ?? '—'}</span>
        <span class="text-slate-400">/10</span>
      </td>
      <td class="px-4 py-3 text-sm text-slate-600">${ev.comment || '—'}</td>
    </tr>
  `).join('');
}

renderList();
