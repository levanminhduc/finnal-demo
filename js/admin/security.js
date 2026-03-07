requireAdmin();
renderHeader();
renderAdminSidebar();

function statusBadge(status) {
  return status === 'active'
    ? '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">active</span>'
    : '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">inactive</span>';
}

function renderUserTable() {
  const users = getAll('users');
  const currentUser = getCurrentUser();

  const rows = users.map(u => {
    const isSelf = currentUser && u.id === currentUser.id;
    const toggleBtn = isSelf
      ? '<span class="text-xs text-slate-400">—</span>'
      : u.status === 'active'
        ? `<button onclick="toggleUserStatus(${u.id})"
             class="rounded-md bg-red-600 text-white text-sm px-3 py-1.5 hover:bg-red-700">Khóa</button>`
        : `<button onclick="toggleUserStatus(${u.id})"
             class="rounded-md bg-green-600 text-white text-sm px-3 py-1.5 hover:bg-green-700">Mở khóa</button>`;

    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm">${u.email}</td>
        <td class="px-4 py-3 text-sm">${u.role}</td>
        <td class="px-4 py-3 text-sm">${statusBadge(u.status)}</td>
        <td class="px-4 py-3 text-sm">${toggleBtn}</td>
      </tr>`;
  }).join('');

  document.getElementById('userTable').innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Role</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
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
