// Kiểm tra quyền admin
requireAdmin();
renderHeader();
renderAdminSidebar();

function initAdminDashboard() {
  const employees = getAll('employees');
  const leaves = getAll('leaves').filter(l => l.status === 'Pending');
  const supports = getAll('supports').filter(s => s.status === 'Pending');
  const recruitments = getAll('recruitments').filter(r => r.status === 'Open');

  const stats = [
    { label: 'Tổng nhân viên', value: employees.length, icon: ICONS.employees, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Đơn nghỉ chờ duyệt', value: leaves.length, icon: ICONS.leaves, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Ticket hỗ trợ', value: supports.length, icon: ICONS.supports, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Vị trí tuyển dụng', value: recruitments.length, icon: ICONS.recruitment, color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="card bg-white hover:scale-[1.02] transition-all duration-300">
      <div class="flex items-start justify-between mb-4">
        <div class="p-3 rounded-2xl ${s.bg} ${s.color} shadow-sm">
          ${s.icon}
        </div>
      </div>
      <div>
        <p class="text-3xl font-black text-slate-900 tracking-tight">${s.value}</p>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">${s.label}</p>
      </div>
    </div>
  `).join('');

  const notifications = getAll('notifications').slice(-5).reverse();
  document.getElementById('recentNotifications').innerHTML = notifications.length
    ? notifications.map(n => `
      <div class="group flex items-center gap-4 py-4 px-1 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-xl px-3 -mx-3">
        <div class="w-2 h-2 rounded-full bg-primary-400 group-hover:scale-125 transition-transform"></div>
        <div class="flex-1">
          <p class="font-bold text-slate-800 text-sm leading-snug group-hover:text-primary-600 transition-colors">${n.title}</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[10px] text-slate-400 font-medium">${formatDate(n.date)}</span>
            <span class="text-[10px] text-slate-300">•</span>
            <span class="text-[10px] text-slate-400 font-medium italic">Hệ thống</span>
          </div>
        </div>
      </div>
    `).join('')
    : `
      <div class="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 mt-2">
        <p class="text-sm text-slate-400 font-medium">Chưa có thông báo nào</p>
      </div>
    `;
}

initAdminDashboard();
