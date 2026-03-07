// Kiểm tra quyền nhân viên
requireEmployee();
renderHeader();
renderEmployeeSidebar();

function initEmployeeDashboard() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const attendance = getAll('attendance').filter(a => a.employeeId === emp.id);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthAttendance = attendance.filter(a => a.date.startsWith(currentMonth));
  const salaries = getAll('salaries').filter(s => s.employeeId === emp.id);
  const latestSalary = salaries.sort((a, b) => b.month.localeCompare(a.month))[0];
  const leaves = getAll('leaves').filter(l => l.employeeId === emp.id);
  const latestLeave = leaves.sort((a, b) => b.id - a.id)[0];

  const stats = [
    { label: 'Họ tên', value: emp.name, color: 'text-slate-800' },
    { label: 'Ngày công tháng này', value: monthAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length + ' ngày', color: 'text-blue-600' },
    { label: 'Lương gần nhất', value: latestSalary ? formatCurrency(latestSalary.total) : 'Chưa có', color: 'text-green-600' },
    { label: 'Đơn nghỉ gần nhất', value: latestLeave ? latestLeave.status : 'Chưa có', color: 'text-yellow-600' }
  ];

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="bg-white rounded-md shadow p-4">
      <p class="text-sm text-slate-500">${s.label}</p>
      <p class="text-lg font-bold ${s.color} mt-1">${s.value}</p>
    </div>
  `).join('');

  document.getElementById('employeeInfo').innerHTML = `
    <h3 class="font-semibold text-slate-700 mb-3">Thông tin cá nhân</h3>
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div><span class="text-slate-500">Phòng ban:</span> <span class="font-medium">${emp.department}</span></div>
      <div><span class="text-slate-500">Chức vụ:</span> <span class="font-medium">${emp.position}</span></div>
      <div><span class="text-slate-500">Email:</span> <span class="font-medium">${getCurrentUser().email}</span></div>
      <div><span class="text-slate-500">SĐT:</span> <span class="font-medium">${emp.phone || 'Chưa cập nhật'}</span></div>
      <div><span class="text-slate-500">Ngày vào làm:</span> <span class="font-medium">${formatDate(emp.joinDate)}</span></div>
      <div><span class="text-slate-500">Giới tính:</span> <span class="font-medium">${emp.gender || 'Chưa cập nhật'}</span></div>
    </div>
  `;
}

initEmployeeDashboard();
