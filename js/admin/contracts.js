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
  if (status === 'Active') return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-emerald-50 text-emerald-700 border border-emerald-100">Đang hiệu lực</span>';
  return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-slate-50 text-slate-500 border border-slate-200">Hết hạn</span>';
}

function renderList() {
  const contracts = getAll('contracts');
  const tbody = document.getElementById('contractTableBody');
  if (!contracts.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-slate-50/50">Chưa có dữ liệu hợp đồng</td></tr>';
    return;
  }
  tbody.innerHTML = contracts.map(c => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${getEmpName(c.employeeId)}</td>
      <td class="px-6 py-4">
        <span class="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">${contractTypeLabel(c.type)}</span>
      </td>
      <td class="px-6 py-4 text-sm text-slate-500 font-mono">${formatDate(c.startDate)}</td>
      <td class="px-6 py-4 text-sm text-slate-500 font-mono">${formatDate(c.endDate)}</td>
      <td class="px-6 py-4 text-sm">${statusBadge(c.status)}</td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="editItem(${c.id})" 
            class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deleteItem(${c.id})" 
            class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
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
