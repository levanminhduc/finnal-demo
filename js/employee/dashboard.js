// Kiểm tra quyền nhân viên
requireEmployee();
renderHeader();
renderEmployeeSidebar();

function initEmployeeDashboard() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const attendanceRecords = getAll('attendance').filter(a => a.employeeId === emp.id);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthAttendance = attendanceRecords.filter(a => a.date.startsWith(currentMonth));
  const salaries = getAll('salaries').filter(s => s.employeeId === emp.id);
  const latestSalary = salaries.sort((a, b) => (b.month || '').localeCompare(a.month || ''))[0];
  const leaves = getAll('leaves').filter(l => l.employeeId === emp.id);
  const latestLeave = leaves.sort((a, b) => b.id - a.id)[0];

  const stats = [
    { label: 'Họ tên', value: emp.name, icon: ICONS.profile, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Ngày công tháng này', value: monthAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length + ' ngày', icon: ICONS.attendance, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Lương gần nhất', value: latestSalary ? formatCurrency(latestSalary.total) : 'Chưa có', icon: ICONS.salary, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Đơn nghỉ gần nhất', value: latestLeave ? latestLeave.status : 'Chưa có', icon: ICONS.leaves, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="card bg-white hover:scale-[1.02] transition-all duration-300">
      <div class="flex items-start justify-between mb-4">
        <div class="p-3 rounded-2xl ${s.bg} ${s.color} shadow-sm">
          ${s.icon}
        </div>
      </div>
      <div>
        <p class="text-2xl font-black text-slate-900 tracking-tight">${s.value}</p>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">${s.label}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('employeeInfo').innerHTML = `
    <div class="flex items-center gap-4 mb-6">
      <div class="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm">
        ${ICONS.profile}
      </div>
      <div>
        <h3 class="text-xl font-black text-slate-900 tracking-tight">Thông tin cá nhân</h3>
        <p class="text-slate-500 text-xs font-bold uppercase tracking-widest">Chi tiết hồ sơ nhân viên</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-500">Phòng ban</p>
        <p class="text-sm font-bold text-slate-700">${emp.department}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-500">Chức vụ</p>
        <p class="text-sm font-bold text-slate-700">${emp.position}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-500">Email</p>
        <p class="text-sm font-bold text-slate-700">${getCurrentUser().email}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-500">Số điện thoại</p>
        <p class="text-sm font-bold text-slate-700">${emp.phone || 'Chưa cập nhật'}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-500">Ngày vào làm</p>
        <p class="text-sm font-bold text-slate-700">${formatDate(emp.joinDate)}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary-500">Giới tính</p>
        <p class="text-sm font-bold text-slate-700">${emp.gender || 'Chưa cập nhật'}</p>
      </div>
    </div>
  `;
}

initEmployeeDashboard();
