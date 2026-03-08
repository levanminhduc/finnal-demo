requireAdmin();
renderHeader();
renderAdminSidebar();

function statusBadge(status) {
  if (status === 'Approved') return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-emerald-50 text-emerald-700 border border-emerald-100">Approved</span>';
  if (status === 'Rejected') return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-rose-50 text-rose-700 border border-rose-100">Rejected</span>';
  return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-amber-50 text-amber-700 border border-amber-100">In Review</span>';
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
    container.innerHTML = '<div class="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 mt-4"><p class="text-sm text-slate-400 font-medium">Chưa có đề xuất thăng tiến nào.</p></div>';
    return;
  }

  const rows = promotions.map(p => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${getEmpName(employees, p.employeeId)}</td>
      <td class="px-6 py-4 text-sm text-slate-500 font-medium">${p.currentPosition || '—'}</td>
      <td class="px-6 py-4 text-sm text-primary-600 font-bold">${p.nextPosition || p.proposedPosition || '—'}</td>
      <td class="px-6 py-4 text-sm">${statusBadge(p.status)}</td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="openEditModal(${p.id})" 
            class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deletePromotion(${p.id})" 
            class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="card overflow-hidden mt-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nhân viên</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vị trí hiện tại</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vị trí đề xuất</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
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
