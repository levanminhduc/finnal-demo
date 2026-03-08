requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderEmployeeList(filter) {
  const employees = getAll('employees');
  const filtered = filter
    ? employees.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
    : employees;

  if (!filtered.length) {
    document.getElementById('employeeTable').innerHTML = `
      <div class="text-center py-20 bg-slate-50">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 text-slate-400 rounded-full mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        </div>
        <p class="text-slate-500 font-medium">Không tìm thấy nhân viên nào</p>
      </div>`;
    return;
  }

  const rows = filtered.map((e, i) => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-500 font-medium">${i + 1}</td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shadow-sm">
            ${e.name.charAt(0).toUpperCase()}
          </div>
          <span class="text-sm font-bold text-slate-800">${e.name}</span>
        </div>
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-tighter">
          ${e.department}
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-slate-600 font-medium">${e.position}</td>
      <td class="px-6 py-4 text-sm text-slate-500 font-medium tabular-nums">${e.phone || '—'}</td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onclick="editEmployee(${e.id})" class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Chỉnh sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deleteEmployee(${e.id})" class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </td>
    </tr>`).join('');

  document.getElementById('employeeTable').innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50/50 border-b border-slate-100">
          <tr>
            <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">STT</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Họ tên</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Phòng ban</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Chức vụ</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SĐT</th>
            <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">${rows}</tbody>
      </table>
    </div>`;
}

function resetForm() {
  ['empName', 'empGender', 'empDob', 'empPhone', 'empAddress', 'empDepartment', 'empPosition', 'empEmail', 'empPassword']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  const gender = document.getElementById('empGender');
  if (gender) gender.value = 'Nam';
  const dept = document.getElementById('empDepartment');
  if (dept) dept.value = 'IT';
}

function setAuthFieldsVisible(visible) {
  const fields = document.getElementById('authFields');
  if (!fields) return;
  if (visible) fields.classList.remove('hidden');
  else fields.classList.add('hidden');
}

function openAddEmployee() {
  editingId = null;
  resetForm();
  document.getElementById('modalTitle').textContent = 'Thêm nhân viên mới';
  setAuthFieldsVisible(true);
  openModal('modal');
}

function editEmployee(id) {
  editingId = id;
  const emp = getAll('employees').find(e => e.id === id);
  if (!emp) return;

  document.getElementById('empName').value = emp.name || '';
  document.getElementById('empGender').value = emp.gender || 'Nam';
  document.getElementById('empDob').value = emp.dob || '';
  document.getElementById('empPhone').value = emp.phone || '';
  document.getElementById('empAddress').value = emp.address || '';
  document.getElementById('empDepartment').value = emp.department || 'IT';
  document.getElementById('empPosition').value = emp.position || '';
  document.getElementById('modalTitle').textContent = 'Chỉnh sửa hồ sơ';
  setAuthFieldsVisible(false);
  openModal('modal');
}

function saveEmployee() {
  const name = document.getElementById('empName').value.trim();
  const gender = document.getElementById('empGender').value;
  const dob = document.getElementById('empDob').value;
  const phone = document.getElementById('empPhone').value.trim();
  const address = document.getElementById('empAddress').value.trim();
  const department = document.getElementById('empDepartment').value;
  const position = document.getElementById('empPosition').value.trim();

  if (!name) { showAlert('Vui lòng nhập họ tên', 'error'); return; }
  if (!department) { showAlert('Vui lòng chọn phòng ban', 'error'); return; }

  if (editingId) {
    updateRecord('employees', editingId, { name, gender, dob, phone, address, department, position });
    closeModal('modal');
    showAlert('Cập nhật thành công', 'success');
  } else {
    const email = document.getElementById('empEmail').value.trim();
    const password = document.getElementById('empPassword').value;
    if (!email || !password) { showAlert('Vui lòng nhập email và mật khẩu', 'error'); return; }
    if (getAll('users').find(u => u.email === email)) { showAlert('Email đã tồn tại', 'error'); return; }

    const userId = addRecord('users', { email, password, role: 'employee', status: 'active' });
    addRecord('employees', {
      userId, name, gender, dob, phone, address, department, position,
      joinDate: new Date().toISOString().split('T')[0]
    });
    closeModal('modal');
    showAlert('Thêm nhân viên thành công', 'success');
  }

  renderEmployeeList(document.getElementById('searchInput').value);
}

function deleteEmployee(id) {
  if (!confirm('Bạn có chắc muốn xóa nhân viên này?')) return;
  const emp = getAll('employees').find(e => e.id === id);
  if (emp) deleteRecord('users', emp.userId);
  deleteRecord('employees', id);
  showAlert('Đã xóa nhân viên', 'success');
  renderEmployeeList(document.getElementById('searchInput').value);
}

function searchEmployee() {
  renderEmployeeList(document.getElementById('searchInput').value);
}

renderEmployeeList();
