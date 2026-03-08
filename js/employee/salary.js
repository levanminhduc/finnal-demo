requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderMySalary() {
  const emp = getCurrentEmployee();
  const container = document.getElementById('salaryTable');

  if (!emp) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Không tìm thấy thông tin nhân viên.</p></div>';
    return;
  }

  const salaries = getAll('salaries')
    .filter(s => s.employeeId === emp.id)
    .sort((a, b) => (b.month || '').localeCompare(a.month || ''));

  if (salaries.length === 0) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Chưa có dữ liệu lương.</p></div>';
    return;
  }

  const rows = salaries.map(s => {
    const statusBadge = s.status === 'Paid'
      ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Paid</span>'
      : '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Pending</span>';
    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-black text-slate-900 tracking-tight">${s.month || '—'}</td>
        <td class="px-6 py-4 text-sm font-medium text-slate-600">${formatCurrency(s.base)}</td>
        <td class="px-6 py-4 text-sm font-bold text-emerald-600">+ ${formatCurrency(s.bonus)}</td>
        <td class="px-6 py-4 text-sm font-bold text-rose-600">- ${formatCurrency(s.deduction)}</td>
        <td class="px-6 py-4 text-sm font-black text-slate-900">${formatCurrency(s.total)}</td>
        <td class="px-6 py-4 text-sm">${statusBadge}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50/50 border-b border-slate-100">
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Tháng</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lương cơ bản</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thưởng</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Khấu trừ</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng lương</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">${rows}</tbody>
      </table>
    </div>`;
}

renderMySalary();
