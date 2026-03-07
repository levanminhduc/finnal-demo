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
    tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có dữ liệu</td></tr>';
    return;
  }
  tbody.innerHTML = evals.map(ev => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${getEmpName(ev.employeeId)}</td>
      <td class="px-4 py-3 text-sm">${ev.period || '—'}</td>
      <td class="px-4 py-3 text-sm font-medium">${ev.score ?? '—'}</td>
      <td class="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">${ev.comment || '—'}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="editItem(${ev.id})" class="text-slate-600 hover:text-slate-900 mr-3">Sửa</button>
        <button onclick="deleteItem(${ev.id})" class="text-red-500 hover:text-red-700">Xóa</button>
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
