requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderList() {
  const trainings = getAll('trainings');
  const tbody = document.getElementById('trainingTableBody');
  if (!trainings.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="px-6 py-20 text-center">
          <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
            ${ICONS.trainings}
          </div>
          <p class="text-slate-400 font-medium italic text-sm">Chưa có khóa đào tạo nào</p>
        </td>
      </tr>`;
    return;
  }
  tbody.innerHTML = trainings.map(t => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${t.title || '—'}</td>
      <td class="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">${t.description || '—'}</td>
      <td class="px-6 py-4 text-sm font-medium text-slate-600">${formatDate(t.date)}</td>
      <td class="px-6 py-4 text-sm">
        <span class="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">
          ${Array.isArray(t.attendees) ? t.attendees.length : 0} Nhân viên
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-right">
        <div class="flex justify-end gap-2">
          <button onclick="editItem(${t.id})"
            class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
            title="Sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button onclick="deleteItem(${t.id})"
            class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
            title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
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
