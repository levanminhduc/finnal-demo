requireEmployee();
renderHeader();
renderEmployeeSidebar();

function contractTypeLabel(type) {
  const map = { Internship: 'Thực tập sinh', Probation: 'Thử việc', Official: 'Chính thức' };
  return map[type] || type;
}

function statusBadge(status) {
  if (status === 'Active') {
    return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Đang hiệu lực</span>';
  }
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">Hết hạn</span>';
}

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const contracts = getAll('contracts').filter(c => c.employeeId === emp.id);
  const tbody = document.getElementById('contractTableBody');
  if (!contracts.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có hợp đồng</td></tr>';
    return;
  }
  tbody.innerHTML = contracts.map(c => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${contractTypeLabel(c.type)}</td>
      <td class="px-4 py-3 text-sm">${formatDate(c.startDate)}</td>
      <td class="px-4 py-3 text-sm">${formatDate(c.endDate)}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(c.status)}</td>
    </tr>
  `).join('');
}

renderList();
