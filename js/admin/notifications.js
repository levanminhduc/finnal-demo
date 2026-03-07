requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderList() {
  const notifs = getAll('notifications');
  const tbody = document.getElementById('notifTableBody');
  if (!notifs.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có dữ liệu</td></tr>';
    return;
  }
  tbody.innerHTML = notifs.map(n => {
    const preview = (n.content || '').length > 50 ? n.content.slice(0, 50) + '...' : (n.content || '—');
    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm font-medium">${n.title || '—'}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${preview}</td>
        <td class="px-4 py-3 text-sm">${formatDate(n.date)}</td>
        <td class="px-4 py-3 text-sm">
          <button onclick="editItem(${n.id})" class="text-slate-600 hover:text-slate-900 mr-3">Sửa</button>
          <button onclick="deleteItem(${n.id})" class="text-red-500 hover:text-red-700">Xóa</button>
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
