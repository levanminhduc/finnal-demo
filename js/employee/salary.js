requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderMySalary() {
  const emp = getCurrentEmployee();
  const container = document.getElementById('salaryTable');

  if (!emp) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Không tìm thấy thông tin nhân viên.</p>';
    return;
  }

  const salaries = getAll('salaries')
    .filter(s => s.employeeId === emp.id)
    .sort((a, b) => b.month.localeCompare(a.month));

  if (salaries.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Chưa có dữ liệu lương.</p>';
    return;
  }

  const rows = salaries.map(s => {
    const statusBadge = s.status === 'Paid'
      ? '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Paid</span>'
      : '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>';
    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm">${s.month || '—'}</td>
        <td class="px-4 py-3 text-sm">${formatCurrency(s.base)}</td>
        <td class="px-4 py-3 text-sm">${formatCurrency(s.bonus)}</td>
        <td class="px-4 py-3 text-sm">${formatCurrency(s.deduction)}</td>
        <td class="px-4 py-3 text-sm font-medium">${formatCurrency(s.total)}</td>
        <td class="px-4 py-3 text-sm">${statusBadge}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tháng</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lương cơ bản</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thưởng</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Khấu trừ</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tổng lương</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

renderMySalary();
