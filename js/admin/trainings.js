requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderList() {
  const trainings = getAll('trainings');
  const tbody = document.getElementById('trainingTableBody');
  if (!trainings.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có dữ liệu</td></tr>';
    return;
  }
  tbody.innerHTML = trainings.map(t => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm font-medium">${t.title || '—'}</td>
      <td class="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">${t.description || '—'}</td>
      <td class="px-4 py-3 text-sm">${formatDate(t.date)}</td>
      <td class="px-4 py-3 text-sm">${Array.isArray(t.attendees) ? t.attendees.length : 0}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="editItem(${t.id})" class="text-slate-600 hover:text-slate-900 mr-3">Sửa</button>
        <button onclick="deleteItem(${t.id})" class="text-red-500 hover:text-red-700">Xóa</button>
      </td>
    </tr>
  `).join('');
}

function openAdd() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Thêm khóa đào tạo';
  document.getElementById('titleInput').value = '';
  document.getElementById('descInput').value = '';
  document.getElementById('dateInput').value = '';
  openModal('trainingModal');
}

function editItem(id) {
  const t = getAll('trainings').find(t => t.id === id);
  if (!t) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Sửa khóa đào tạo';
  document.getElementById('titleInput').value = t.title || '';
  document.getElementById('descInput').value = t.description || '';
  document.getElementById('dateInput').value = t.date || '';
  openModal('trainingModal');
}

function saveItem() {
  const title = document.getElementById('titleInput').value.trim();
  const description = document.getElementById('descInput').value.trim();
  const date = document.getElementById('dateInput').value;

  if (!title) { showAlert('Vui lòng nhập tên khóa đào tạo', 'error'); return; }
  if (!date) { showAlert('Vui lòng chọn ngày tổ chức', 'error'); return; }

  if (editingId) {
    const existing = getAll('trainings').find(t => t.id === editingId);
    const attendees = existing ? (existing.attendees || []) : [];
    updateRecord('trainings', editingId, { title, description, date, attendees });
    showAlert('Đã cập nhật khóa đào tạo', 'success');
  } else {
    addRecord('trainings', { title, description, date, attendees: [] });
    showAlert('Đã thêm khóa đào tạo', 'success');
  }
  closeModal('trainingModal');
  renderList();
}

function deleteItem(id) {
  if (!confirm('Xác nhận xóa khóa đào tạo này?')) return;
  deleteRecord('trainings', id);
  showAlert('Đã xóa', 'success');
  renderList();
}

renderList();
