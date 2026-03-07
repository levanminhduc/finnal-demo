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
    { label: 'Tổng nhân viên', value: employees.length, color: 'text-blue-600' },
    { label: 'Đơn nghỉ chờ duyệt', value: leaves.length, color: 'text-yellow-600' },
    { label: 'Ticket hỗ trợ', value: supports.length, color: 'text-red-600' },
    { label: 'Vị trí tuyển dụng', value: recruitments.length, color: 'text-green-600' }
  ];

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="bg-white rounded-md shadow p-4">
      <p class="text-sm text-slate-500">${s.label}</p>
      <p class="text-2xl font-bold ${s.color} mt-1">${s.value}</p>
    </div>
  `).join('');

  const notifications = getAll('notifications').slice(-5).reverse();
  document.getElementById('recentNotifications').innerHTML = notifications.length
    ? notifications.map(n => `
      <div class="border-b border-slate-100 py-3 last:border-0">
        <p class="font-medium text-slate-800 text-sm">${n.title}</p>
        <p class="text-xs text-slate-500 mt-1">${formatDate(n.date)}</p>
      </div>
    `).join('')
    : '<p class="text-sm text-slate-400">Chưa có thông báo</p>';
}

initAdminDashboard();
