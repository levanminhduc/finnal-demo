requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderList() {
  const notifs = getAll('notifications');
  const tbody = document.getElementById('notifTableBody');
  if (!notifs.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-slate-50/50">Chưa có thông báo nào</td></tr>';
    return;
  }
  tbody.innerHTML = notifs.map(n => {
    const preview = (n.content || '').length > 50 ? n.content.slice(0, 50) + '...' : (n.content || '—');
    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-800">${n.title || '—'}</td>
        <td class="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">${preview}</td>
        <td class="px-6 py-4 text-sm text-slate-500 font-mono">${formatDate(n.date)}</td>
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button onclick="editItem(${n.id})" 
              class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Sửa">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button onclick="deleteItem(${n.id})" 
              class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Xóa">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openAdd() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Thêm thông báo';
  document.getElementById('titleInput').value = '';
  document.getElementById('contentInput').value = '';
  document.getElementById('dateInput').value = '';
  openModal('notifModal');
}

function editItem(id) {
  const n = getAll('notifications').find(n => n.id === id);
  if (!n) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Sửa thông báo';
  document.getElementById('titleInput').value = n.title || '';
  document.getElementById('contentInput').value = n.content || '';
  document.getElementById('dateInput').value = n.date || '';
  openModal('notifModal');
}

function saveItem() {
  const title = document.getElementById('titleInput').value.trim();
  const content = document.getElementById('contentInput').value.trim();
  const date = document.getElementById('dateInput').value;

  if (!title) { showAlert('Vui lòng nhập tiêu đề', 'error'); return; }
  if (!date) { showAlert('Vui lòng chọn ngày', 'error'); return; }

  const record = { title, content, date };
  if (editingId) {
    updateRecord('notifications', editingId, record);
    showAlert('Đã cập nhật thông báo', 'success');
  } else {
    addRecord('notifications', record);
    showAlert('Đã thêm thông báo', 'success');
  }
  closeModal('notifModal');
  renderList();
}

function deleteItem(id) {
  if (!confirm('Xác nhận xóa thông báo này?')) return;
  deleteRecord('notifications', id);
  showAlert('Đã xóa', 'success');
  renderList();
}

renderList();
