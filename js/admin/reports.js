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
    { label: 'Tổng nhân viên', value: employees.length, color: 'text-blue-600' },
    { label: 'Ngày công tháng này', value: thisMonthAttendance.length, color: 'text-green-600' },
    { label: 'Tổng lương đã trả', value: formatCurrency(paidSalaryTotal), color: 'text-yellow-600' },
    { label: 'Đơn nghỉ đã duyệt', value: approvedLeaves.length, color: 'text-purple-600' }
  ];

  document.getElementById('statCards').innerHTML = cards.map(c => `
    <div class="bg-white rounded-md shadow p-4">
      <p class="text-xs text-slate-500 mb-1">${c.label}</p>
      <p class="text-2xl font-bold ${c.color}">${c.value}</p>
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
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm font-medium text-slate-800">${emp.name}</td>
        <td class="px-4 py-3 text-sm">${emp.department}</td>
        <td class="px-4 py-3 text-sm">${workDays}</td>
        <td class="px-4 py-3 text-sm">${latestSalary ? formatCurrency(latestSalary.total) : '—'}</td>
        <td class="px-4 py-3 text-sm">${latestEval ? latestEval.score : '—'}</td>
      </tr>`;
  }).join('');

  document.getElementById('reportTable').innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tên nhân viên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Phòng ban</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Ngày công</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lương mới nhất</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Điểm đánh giá</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

renderStatCards();
renderReportTable();
