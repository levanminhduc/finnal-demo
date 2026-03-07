requireEmployee();
renderHeader();
renderEmployeeSidebar();

let isEditing = false;

function renderProfile() {
  const emp = getCurrentEmployee();
  const user = getCurrentUser();

  if (!emp) {
    document.getElementById('profileCard').innerHTML =
      '<p class="text-sm text-slate-400">Không tìm thấy thông tin nhân viên.</p>';
    return;
  }

  document.getElementById('profileCard').innerHTML = `
    <div class="grid grid-cols-2 gap-6">
      <div class="space-y-3">
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Họ tên</span>
          <p class="text-sm font-medium text-slate-800 mt-0.5">${emp.name}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Giới tính</span>
          <p class="text-sm text-slate-700 mt-0.5">${emp.gender || '—'}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Ngày sinh</span>
          <p class="text-sm text-slate-700 mt-0.5">${formatDate(emp.dob)}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Số điện thoại</span>
          <p class="text-sm text-slate-700 mt-0.5">${emp.phone || '—'}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Địa chỉ</span>
          <p class="text-sm text-slate-700 mt-0.5">${emp.address || '—'}</p>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Phòng ban</span>
          <p class="text-sm text-slate-700 mt-0.5">${emp.department || '—'}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Chức vụ</span>
          <p class="text-sm text-slate-700 mt-0.5">${emp.position || '—'}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Ngày vào làm</span>
          <p class="text-sm text-slate-700 mt-0.5">${formatDate(emp.joinDate)}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase">Email</span>
          <p class="text-sm text-slate-700 mt-0.5">${user ? user.email : '—'}</p>
        </div>
      </div>
    </div>`;
}

function toggleEdit() {
  isEditing = true;
  const emp = getCurrentEmployee();
  if (!emp) return;

  document.getElementById('editName').value = emp.name || '';
  document.getElementById('editGender').value = emp.gender || 'Nam';
  document.getElementById('editDob').value = emp.dob || '';
  document.getElementById('editPhone').value = emp.phone || '';
  document.getElementById('editAddress').value = emp.address || '';

  document.getElementById('editForm').classList.remove('hidden');
  document.getElementById('editBtn').classList.add('hidden');
}

function cancelEdit() {
  isEditing = false;
  document.getElementById('editForm').classList.add('hidden');
  document.getElementById('editBtn').classList.remove('hidden');
}

function saveProfile() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const name = document.getElementById('editName').value.trim();
  if (!name) { showAlert('Vui lòng nhập họ tên', 'error'); return; }

  const updated = {
    name,
    gender: document.getElementById('editGender').value,
    dob: document.getElementById('editDob').value,
    phone: document.getElementById('editPhone').value.trim(),
    address: document.getElementById('editAddress').value.trim()
  };

  updateRecord('employees', emp.id, updated);

  // Refresh currentUser display name via re-render
  cancelEdit();
  showAlert('Cập nhật thành công', 'success');
  renderProfile();
}

renderProfile();
