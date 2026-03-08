requireAdmin();
renderHeader();
renderAdminSidebar();

function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7); // "YYYY-MM"
}

function renderStatCards() {
  const employees = getAll('employees');
  const attendance = getAll('attendance');
  const salaries = getAll('salaries');
  const leaves = getAll('leaves');
  const month = getCurrentMonth();

  const thisMonthAttendance = attendance.filter(a =>
    a.date && a.date.startsWith(month) && (a.status === 'Present' || a.status === 'Late')
  );
  const paidSalaryTotal = salaries
    .filter(s => s.status === 'Paid')
    .reduce((sum, s) => sum + (s.total || 0), 0);
  const approvedLeaves = leaves.filter(l => l.status === 'Approved');

  const cards = [
    { label: 'Tổng nhân viên', value: employees.length, icon: ICONS.employees, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Ngày công tháng này', value: thisMonthAttendance.length, icon: ICONS.attendance, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Tổng lương đã trả', value: formatCurrency(paidSalaryTotal), icon: ICONS.salary, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Đơn nghỉ đã duyệt', value: approvedLeaves.length, icon: ICONS.leaves, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  document.getElementById('statCards').innerHTML = cards.map(c => `
    <div class="card bg-white hover:scale-[1.02] transition-all duration-300">
      <div class="flex items-start justify-between mb-4">
        <div class="p-3 rounded-2xl ${c.bg} ${c.color} shadow-sm">
          ${c.icon}
        </div>
      </div>
      <div>
        <p class="text-3xl font-black text-slate-900 tracking-tight">${c.value}</p>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">${c.label}</p>
      </div>
    </div>`).join('');
}

function renderReportTable() {
  const employees = getAll('employees');
  const attendance = getAll('attendance');
  const salaries = getAll('salaries');
  const evaluations = getAll('evaluations');
  const month = getCurrentMonth();

  const rows = employees.map(emp => {
    const workDays = attendance.filter(a =>
      a.employeeId === emp.id &&
      a.date && a.date.startsWith(month) &&
      (a.status === 'Present' || a.status === 'Late')
    ).length;

    const empSalaries = salaries.filter(s => s.employeeId === emp.id);
    const latestSalary = empSalaries.length
      ? empSalaries.sort((a, b) => b.month.localeCompare(a.month))[0]
      : null;

    const empEvals = evaluations.filter(e => e.employeeId === emp.id);
    const latestEval = empEvals.length
      ? empEvals[empEvals.length - 1]
      : null;

    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-800">${emp.name}</td>
        <td class="px-6 py-4 text-sm text-slate-600">${emp.department}</td>
        <td class="px-6 py-4 text-sm font-medium text-slate-700">${workDays}</td>
        <td class="px-6 py-4 text-sm font-medium text-slate-700">${latestSalary ? formatCurrency(latestSalary.total) : '—'}</td>
        <td class="px-6 py-4 text-sm">
          <span class="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">
            ${latestEval ? latestEval.score : '—'}
          </span>
        </td>
      </tr>`;
  }).join('');

  document.getElementById('reportTable').innerHTML = `
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Tên nhân viên</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Phòng ban</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Ngày công</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Lương mới nhất</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Điểm đánh giá</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

renderStatCards();
renderReportTable();
