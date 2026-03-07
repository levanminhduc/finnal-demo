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
    { label: 'Tổng ngày công', value: workDays, color: 'text-blue-600' },
    { label: 'Tổng đơn nghỉ', value: totalLeaves, color: 'text-yellow-600' },
    { label: 'Điểm đánh giá trung bình', value: avgScore, color: 'text-green-600' }
  ];

  document.getElementById('statCards').innerHTML = cards.map(c => `
    <div class="bg-white rounded-md shadow p-4">
      <p class="text-xs text-slate-500 mb-1">${c.label}</p>
      <p class="text-2xl font-bold ${c.color}">${c.value}</p>
    </div>`).join('');
}

renderStatCards();
