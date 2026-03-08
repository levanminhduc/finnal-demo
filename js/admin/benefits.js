requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderList() {
  const benefits = getAll('benefits');
  const tbody = document.getElementById('benefitTableBody');
  if (!benefits.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-slate-50/50">Chưa có dữ liệu phúc lợi nào</td></tr>';
    return;
  }
  tbody.innerHTML = benefits.map(b => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${b.title || b.name || '—'}</td>
      <td class="px-6 py-4 text-sm text-slate-600 leading-relaxed">${b.description || '—'}</td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="editItem(${b.id})" 
            class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deleteItem(${b.id})" 
            class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
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
