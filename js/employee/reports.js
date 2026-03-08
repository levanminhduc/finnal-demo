requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderStatCards() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const attendance = getAll('attendance');
  const leaves = getAll('leaves');
  const evaluations = getAll('evaluations');

  const workDays = attendance.filter(a =>
    a.employeeId === emp.id && (a.status === 'Present' || a.status === 'Late')
  ).length;

  const totalLeaves = leaves.filter(l => l.employeeId === emp.id).length;

  const empEvals = evaluations.filter(e => e.employeeId === emp.id);
  const avgScore = empEvals.length
    ? (empEvals.reduce((sum, e) => sum + e.score, 0) / empEvals.length).toFixed(1)
    : '—';

  const cards = [
    { label: 'Tổng ngày công', value: workDays + ' ngày', icon: ICONS.attendance, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tổng đơn nghỉ', value: totalLeaves + ' đơn', icon: ICONS.leaves, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Điểm đánh giá', value: avgScore + ' / 10', icon: ICONS.evaluations, color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  document.getElementById('statCards').innerHTML = cards.map(c => `
    <div class="card bg-white hover:scale-[1.02] transition-all duration-300">
      <div class="flex items-start justify-between mb-4">
        <div class="p-3 rounded-2xl ${c.bg} ${c.color} shadow-sm">
          ${c.icon}
        </div>
      </div>
      <div>
        <p class="text-2xl font-black text-slate-900 tracking-tight">${c.value}</p>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">${c.label}</p>
      </div>
    </div>`).join('');
}

renderStatCards();
