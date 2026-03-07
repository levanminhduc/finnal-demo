requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function getEmpName(empId) {
  const emp = getAll('employees').find(e => e.id === empId);
  return emp ? emp.name : 'Không xác định';
}

function contractTypeLabel(type) {
  const map = { Internship: 'Thực tập sinh', Probation: 'Thử việc', Official: 'Chính thức' };
  return map[type] || type;
}

function statusBadge(status) {
  if (status === 'Active') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Đang hiệu lực</span>';
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">Hết hạn</span>';
}

function renderList() {
  const contracts = getAll('contracts');
  const tbody = document.getElementById('contractTableBody');
  if (!contracts.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có dữ liệu</td></tr>';
    return;
  }
  tbody.innerHTML = contracts.map(c => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${getEmpName(c.employeeId)}</td>
      <td class="px-4 py-3 text-sm">${contractTypeLabel(c.type)}</td>
      <td class="px-4 py-3 text-sm">${formatDate(c.startDate)}</td>
      <td class="px-4 py-3 text-sm">${formatDate(c.endDate)}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(c.status)}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="editItem(${c.id})" class="text-slate-600 hover:text-slate-900 mr-3">Sửa</button>
        <button onclick="deleteItem(${c.id})" class="text-red-500 hover:text-red-700">Xóa</button>
      </td>
    </tr>
  `).join('');
}

function populateEmpSelect(selectedId) {
  const emps = getAll('employees');
  const sel = document.getElementById('empSelect');
  sel.innerHTML = emps.map(e =>
    `<option value="${e.id}" ${e.id === selectedId ? 'selected' : ''}>${e.name}</option>`
  ).join('');
}

function openAdd() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Thêm hợp đồng';
  populateEmpSelect(null);
  document.getElementById('typeSelect').value = 'Official';
  document.getElementById('startDateInput').value = '';
  document.getElementById('endDateInput').value = '';
  document.getElementById('statusSelect').value = 'Active';
  openModal('contractModal');
}

function editItem(id) {
  const c = getAll('contracts').find(c => c.id === id);
  if (!c) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Sửa hợp đồng';
  populateEmpSelect(c.employeeId);
  document.getElementById('typeSelect').value = c.type || 'Official';
  document.getElementById('startDateInput').value = c.startDate || '';
  document.getElementById('endDateInput').value = c.endDate || '';
  document.getElementById('statusSelect').value = c.status || 'Active';
  openModal('contractModal');
}

function saveItem() {
  const employeeId = parseInt(document.getElementById('empSelect').value);
  const type = document.getElementById('typeSelect').value;
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;
  const status = document.getElementById('statusSelect').value;

  if (!startDate) { showAlert('Vui lòng chọn ngày bắt đầu', 'error'); return; }
  if (!endDate) { showAlert('Vui lòng chọn ngày kết thúc', 'error'); return; }
  if (endDate < startDate) { showAlert('Ngày kết thúc phải sau ngày bắt đầu', 'error'); return; }

  const record = { employeeId, type, startDate, endDate, status };
  if (editingId) {
    updateRecord('contracts', editingId, record);
    showAlert('Đã cập nhật hợp đồng', 'success');
  } else {
    addRecord('contracts', record);
    showAlert('Đã thêm hợp đồng', 'success');
  }
  closeModal('contractModal');
  renderList();
}

function deleteItem(id) {
  if (!confirm('Xác nhận xóa hợp đồng này?')) return;
  deleteRecord('contracts', id);
  showAlert('Đã xóa', 'success');
  renderList();
}

renderList();
