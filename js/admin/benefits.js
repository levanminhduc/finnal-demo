requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderList() {
  const benefits = getAll('benefits');
  const tbody = document.getElementById('benefitTableBody');
  if (!benefits.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có dữ liệu</td></tr>';
    return;
  }
  tbody.innerHTML = benefits.map(b => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm font-medium">${b.title || b.name || '—'}</td>
      <td class="px-4 py-3 text-sm text-slate-600">${b.description || '—'}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="editItem(${b.id})" class="text-slate-600 hover:text-slate-900 mr-3">Sửa</button>
        <button onclick="deleteItem(${b.id})" class="text-red-500 hover:text-red-700">Xóa</button>
      </td>
    </tr>
  `).join('');
}

function openAdd() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Thêm phúc lợi';
  document.getElementById('titleInput').value = '';
  document.getElementById('descInput').value = '';
  openModal('benefitModal');
}

function editItem(id) {
  const b = getAll('benefits').find(b => b.id === id);
  if (!b) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Sửa phúc lợi';
  document.getElementById('titleInput').value = b.title || b.name || '';
  document.getElementById('descInput').value = b.description || '';
  openModal('benefitModal');
}

function saveItem() {
  const title = document.getElementById('titleInput').value.trim();
  const description = document.getElementById('descInput').value.trim();

  if (!title) { showAlert('Vui lòng nhập tên phúc lợi', 'error'); return; }

  const record = { title, description };
  if (editingId) {
    updateRecord('benefits', editingId, record);
    showAlert('Đã cập nhật phúc lợi', 'success');
  } else {
    addRecord('benefits', record);
    showAlert('Đã thêm phúc lợi', 'success');
  }
  closeModal('benefitModal');
  renderList();
}

function deleteItem(id) {
  if (!confirm('Xác nhận xóa phúc lợi này?')) return;
  deleteRecord('benefits', id);
  showAlert('Đã xóa', 'success');
  renderList();
}

renderList();
