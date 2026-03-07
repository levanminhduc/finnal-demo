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
    document.getElementById('employeeTable').innerHTML =
      '<p class="text-sm text-slate-400 py-4">Không tìm thấy nhân viên</p>';
    return;
  }

  const rows = filtered.map((e, i) => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${i + 1}</td>
      <td class="px-4 py-3 text-sm font-medium">${e.name}</td>
      <td class="px-4 py-3 text-sm">${e.department}</td>
      <td class="px-4 py-3 text-sm">${e.position}</td>
      <td class="px-4 py-3 text-sm">${e.phone || '—'}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="editEmployee(${e.id})" class="text-blue-600 hover:underline text-sm mr-2">Sửa</button>
        <button onclick="deleteEmployee(${e.id})" class="text-red-600 hover:underline text-sm">Xóa</button>
      </td>
    </tr>`).join('');

  document.getElementById('employeeTable').innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">STT</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Họ tên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Phòng ban</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Chức vụ</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">SĐT</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
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
  document.getElementById('modalTitle').textContent = 'Thêm nhân viên';
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
  document.getElementById('modalTitle').textContent = 'Chỉnh sửa nhân viên';
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
