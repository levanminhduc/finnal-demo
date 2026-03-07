requireAdmin();
renderHeader();
renderAdminSidebar();

function statusBadge(status) {
  if (status === 'Approved') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Approved</span>';
  if (status === 'Rejected') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Rejected</span>';
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">In Review</span>';
}

function getEmpName(employees, empId) {
  const emp = employees.find(e => e.id === empId);
  return emp ? emp.name : '—';
}

function renderPromotionTable() {
  const promotions = getAll('promotions');
  const employees = getAll('employees');
  const container = document.getElementById('promotionTable');

  if (promotions.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Chưa có đề xuất thăng tiến nào.</p>';
    return;
  }

  const rows = promotions.map(p => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm font-medium text-slate-800">${getEmpName(employees, p.employeeId)}</td>
      <td class="px-4 py-3 text-sm">${p.currentPosition || '—'}</td>
      <td class="px-4 py-3 text-sm">${p.nextPosition || p.proposedPosition || '—'}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(p.status)}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="openEditModal(${p.id})"
          class="rounded-md bg-slate-800 text-white text-sm px-3 py-1.5 hover:bg-slate-700 mr-1">Sửa</button>
        <button onclick="deletePromotion(${p.id})"
          class="rounded-md bg-red-600 text-white text-sm px-3 py-1.5 hover:bg-red-700">Xóa</button>
      </td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nhân viên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Vị trí hiện tại</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Vị trí đề xuất</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

function populateEmployeeSelect(selectedId) {
  const employees = getAll('employees');
  const sel = document.getElementById('pEmployee');
  sel.innerHTML = '<option value="">-- Chọn nhân viên --</option>' +
    employees.map(e => `<option value="${e.id}" ${e.id === selectedId ? 'selected' : ''}>${e.name}</option>`).join('');
}

function fillCurrentPosition() {
  const empId = parseInt(document.getElementById('pEmployee').value, 10);
  const emp = getAll('employees').find(e => e.id === empId);
  document.getElementById('pCurrentPosition').value = emp ? emp.position : '';
}

function openAddModal() {
  document.getElementById('modalTitle').textContent = 'Thêm đề xuất thăng tiến';
  document.getElementById('editId').value = '';
  document.getElementById('pNextPosition').value = '';
  document.getElementById('pCurrentPosition').value = '';
  document.getElementById('pStatus').value = 'In Review';
  populateEmployeeSelect(null);
  openModal('promotionModal');
}

function openEditModal(id) {
  const p = getAll('promotions').find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalTitle').textContent = 'Sửa đề xuất thăng tiến';
  document.getElementById('editId').value = p.id;
  document.getElementById('pNextPosition').value = p.nextPosition || p.proposedPosition || '';
  document.getElementById('pCurrentPosition').value = p.currentPosition || '';
  document.getElementById('pStatus').value = p.status;
  populateEmployeeSelect(p.employeeId);
  openModal('promotionModal');
}

function savePromotion() {
  const empId = parseInt(document.getElementById('pEmployee').value, 10);
  const currentPosition = document.getElementById('pCurrentPosition').value.trim();
  const nextPosition = document.getElementById('pNextPosition').value.trim();
  const status = document.getElementById('pStatus').value;
  const editId = document.getElementById('editId').value;

  if (!empId) { showAlert('Vui lòng chọn nhân viên', 'error'); return; }
  if (!nextPosition) { showAlert('Vui lòng nhập vị trí đề xuất', 'error'); return; }

  if (editId) {
    updateRecord('promotions', parseInt(editId, 10), { employeeId: empId, currentPosition, nextPosition, status });
    showAlert('Cập nhật thành công', 'success');
  } else {
    addRecord('promotions', { employeeId: empId, currentPosition, nextPosition, status });
    showAlert('Thêm đề xuất thành công', 'success');
  }

  closeModal('promotionModal');
  renderPromotionTable();
}

function deletePromotion(id) {
  if (!confirm('Xác nhận xóa đề xuất thăng tiến này?')) return;
  deleteRecord('promotions', id);
  showAlert('Đã xóa đề xuất', 'success');
  renderPromotionTable();
}

renderPromotionTable();
