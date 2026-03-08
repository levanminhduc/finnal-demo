requireAdmin();
renderHeader();
renderAdminSidebar();

function statusBadge(status) {
  return status === 'active'
    ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Active</span>'
    : '<span class="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Inactive</span>';
}

function renderUserTable() {
  const users = getAll('users');
  const currentUser = getCurrentUser();

  const rows = users.map(u => {
    const isSelf = currentUser && u.id === currentUser.id;
    const toggleBtn = isSelf
      ? '<span class="text-xs font-bold text-slate-400 uppercase tracking-widest italic px-4">Đang dùng</span>'
      : u.status === 'active'
        ? `<button onclick="toggleUserStatus(${u.id})"
             class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 transition-colors text-xs font-bold uppercase tracking-tighter">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
             Khóa
           </button>`
        : `<button onclick="toggleUserStatus(${u.id})"
             class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition-colors text-xs font-bold uppercase tracking-tighter">
             <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>
             Mở khóa
           </button>`;

    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-800">${u.email}</td>
        <td class="px-6 py-4 text-sm font-medium">
          <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
            ${u.role}
          </span>
        </td>
        <td class="px-6 py-4 text-sm">${statusBadge(u.status)}</td>
        <td class="px-6 py-4 text-sm">${toggleBtn}</td>
      </tr>`;
  }).join('');

  document.getElementById('userTable').innerHTML = `
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Email</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Vai trò</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Trạng thái</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function toggleUserStatus(id) {
  const users = getAll('users');
  const user = users.find(u => u.id === id);
  if (!user) return;
  const newStatus = user.status === 'active' ? 'inactive' : 'active';
  updateRecord('users', id, { status: newStatus });
  showAlert(newStatus === 'active' ? 'Đã mở khóa tài khoản' : 'Đã khóa tài khoản', 'success');
  renderUserTable();
}

function changeAdminPassword() {
  const oldPwd = document.getElementById('oldPassword').value;
  const newPwd = document.getElementById('newPassword').value;
  const confirmPwd = document.getElementById('confirmNewPassword').value;

  if (!oldPwd || !newPwd || !confirmPwd) { showAlert('Vui lòng nhập đầy đủ thông tin', 'error'); return; }

  const currentUser = getCurrentUser();
  const users = getAll('users');
  const adminUser = users.find(u => u.id === currentUser.id);

  if (!adminUser || adminUser.password !== oldPwd) { showAlert('Mật khẩu hiện tại không đúng', 'error'); return; }
  if (newPwd !== confirmPwd) { showAlert('Mật khẩu xác nhận không khớp', 'error'); return; }
  if (newPwd.length < 4) { showAlert('Mật khẩu mới quá ngắn', 'error'); return; }

  updateRecord('users', currentUser.id, { password: newPwd });
  localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPwd }));

  document.getElementById('oldPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmNewPassword').value = '';
  showAlert('Đổi mật khẩu thành công', 'success');
}

renderUserTable();
