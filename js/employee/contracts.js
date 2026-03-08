requireEmployee();
renderHeader();
renderEmployeeSidebar();

function contractTypeLabel(type) {
  const map = { Internship: 'Thực tập sinh', Probation: 'Thử việc', Official: 'Chính thức' };
  return map[type] || type;
}

function statusBadge(status) {
  if (status === 'Active') {
    return '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đang hiệu lực</span>';
  }
  return '<span class="bg-slate-50 text-slate-700 border border-slate-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Hết hạn</span>';
}

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const contracts = getAll('contracts').filter(c => c.employeeId === emp.id);
  const tbody = document.getElementById('contractTableBody');
  if (!contracts.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-white rounded-b-3xl border-t border-slate-100">Chưa có hợp đồng nào được ghi nhận.</td></tr>';
    return;
  }
  tbody.innerHTML = contracts.map(c => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-700 leading-none underline decoration-slate-200 underline-offset-4">${contractTypeLabel(c.type)}</td>
      <td class="px-6 py-4 text-sm font-medium text-slate-600">${formatDate(c.startDate)}</td>
      <td class="px-6 py-4 text-sm font-medium text-slate-600">${formatDate(c.endDate)}</td>
      <td class="px-6 py-4 text-sm">${statusBadge(c.status)}</td>
    </tr>
  `).join('');
}

renderList();
