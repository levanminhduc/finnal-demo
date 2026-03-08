requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function getEmpName(empId) {
  const emp = getAll('employees').find(e => e.id === empId);
  return emp ? emp.name : 'Không xác định';
}

function renderList() {
  const evals = getAll('evaluations');
  const tbody = document.getElementById('evalTableBody');
  if (!evals.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-slate-50/50">Chưa có dữ liệu đánh giá nào</td></tr>';
    return;
  }
  tbody.innerHTML = evals.map(ev => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${getEmpName(ev.employeeId)}</td>
      <td class="px-6 py-4 text-sm text-slate-500 font-medium">${ev.period || '—'}</td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${ev.score >= 8 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ev.score >= 5 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'} border">
          ${ev.score ?? '—'} / 10
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">${ev.comment || '—'}</td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="editItem(${ev.id})" 
            class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deleteItem(${ev.id})" 
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
  document.getElementById('modalTitle').textContent = 'Thêm đánh giá';
  populateEmpSelect(null);
  document.getElementById('periodInput').value = '';
  document.getElementById('scoreInput').value = '';
  document.getElementById('commentInput').value = '';
  openModal('evalModal');
}

function editItem(id) {
  const ev = getAll('evaluations').find(e => e.id === id);
  if (!ev) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Sửa đánh giá';
  populateEmpSelect(ev.employeeId);
  document.getElementById('periodInput').value = ev.period || '';
  document.getElementById('scoreInput').value = ev.score ?? '';
  document.getElementById('commentInput').value = ev.comment || '';
  openModal('evalModal');
}

function saveItem() {
  const employeeId = parseInt(document.getElementById('empSelect').value);
  const period = document.getElementById('periodInput').value.trim();
  const score = parseFloat(document.getElementById('scoreInput').value);
  const comment = document.getElementById('commentInput').value.trim();

  if (!period) { showAlert('Vui lòng nhập kỳ đánh giá', 'error'); return; }
  if (isNaN(score) || score < 0 || score > 10) { showAlert('Điểm phải từ 0 đến 10', 'error'); return; }

  const record = { employeeId, period, score, comment };
  if (editingId) {
    updateRecord('evaluations', editingId, record);
    showAlert('Đã cập nhật đánh giá', 'success');
  } else {
    addRecord('evaluations', record);
    showAlert('Đã thêm đánh giá', 'success');
  }
  closeModal('evalModal');
  renderList();
}

function deleteItem(id) {
  if (!confirm('Xác nhận xóa đánh giá này?')) return;
  deleteRecord('evaluations', id);
  showAlert('Đã xóa', 'success');
  renderList();
}

renderList();
