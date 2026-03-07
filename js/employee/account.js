requireEmployee();
renderHeader();
renderEmployeeSidebar();

function changePassword() {
  const oldPwd = document.getElementById('oldPassword').value;
  const newPwd = document.getElementById('newPassword').value;
  const confirmPwd = document.getElementById('confirmNewPassword').value;

  if (!oldPwd || !newPwd || !confirmPwd) { showAlert('Vui lòng nhập đầy đủ thông tin', 'error'); return; }

  const currentUser = getCurrentUser();
  const users = getAll('users');
  const user = users.find(u => u.id === currentUser.id);

  if (!user || user.password !== oldPwd) { showAlert('Mật khẩu hiện tại không đúng', 'error'); return; }
  if (newPwd !== confirmPwd) { showAlert('Mật khẩu xác nhận không khớp', 'error'); return; }
  if (newPwd.length < 4) { showAlert('Mật khẩu mới quá ngắn', 'error'); return; }

  updateRecord('users', currentUser.id, { password: newPwd });
  localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPwd }));

  document.getElementById('oldPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmNewPassword').value = '';
  showAlert('Đổi mật khẩu thành công', 'success');
}
