requireAdmin();
renderHeader();
renderAdminSidebar();

function statusBadge(status) {
  return status === 'Open'
    ? '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-emerald-50 text-emerald-700 border border-emerald-100">Open</span>'
    : '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-slate-50 text-slate-500 border border-slate-200">Closed</span>';
}

function renderRecruitmentTable() {
  const recruitments = getAll('recruitments');
  const applications = getAll('applications');
  const container = document.getElementById('recruitmentTable');

  if (recruitments.length === 0) {
    container.innerHTML = '<div class="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 mt-4"><p class="text-sm text-slate-400 font-medium">Chưa có vị trí tuyển dụng nào.</p></div>';
    return;
  }

  const rows = recruitments.map(r => {
    const appCount = applications.filter(a => a.recruitmentId === r.id).length;
    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-800">${r.title}</td>
        <td class="px-6 py-4 text-sm text-slate-500 font-medium">${r.department}</td>
        <td class="px-6 py-4 text-sm">${statusBadge(r.status)}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-700 text-xs font-bold">
            ${appCount}
          </span>
        </td>
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button onclick="openEditModal(${r.id})" 
              class="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors" title="Sửa">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button onclick="deleteRecruitment(${r.id})" 
              class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Xóa">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="card overflow-hidden mt-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiêu đề</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Phòng ban</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Số ứng viên</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function openAddModal() {
  document.getElementById('modalTitle').textContent = 'Thêm vị trí tuyển dụng';
  document.getElementById('editId').value = '';
  document.getElementById('rTitle').value = '';
  document.getElementById('rDepartment').value = 'IT';
  document.getElementById('rDescription').value = '';
  document.getElementById('rStatus').value = 'Open';
  openModal('recruitmentModal');
}

function openEditModal(id) {
  const r = getAll('recruitments').find(x => x.id === id);
  if (!r) return;
  document.getElementById('modalTitle').textContent = 'Sửa vị trí tuyển dụng';
  document.getElementById('editId').value = r.id;
  document.getElementById('rTitle').value = r.title;
  document.getElementById('rDepartment').value = r.department;
  document.getElementById('rDescription').value = r.description || r.requirements || '';
  document.getElementById('rStatus').value = r.status;
  openModal('recruitmentModal');
}

function saveRecruitment() {
  const title = document.getElementById('rTitle').value.trim();
  const department = document.getElementById('rDepartment').value;
  const description = document.getElementById('rDescription').value.trim();
  const status = document.getElementById('rStatus').value;
  const editId = document.getElementById('editId').value;

  if (!title) { showAlert('Vui lòng nhập tiêu đề', 'error'); return; }

  if (editId) {
    updateRecord('recruitments', parseInt(editId, 10), { title, department, description, status });
    showAlert('Cập nhật thành công', 'success');
  } else {
    addRecord('recruitments', { title, department, description, status });
    showAlert('Thêm vị trí thành công', 'success');
  }

  closeModal('recruitmentModal');
  renderRecruitmentTable();
}

function deleteRecruitment(id) {
  if (!confirm('Xác nhận xóa vị trí tuyển dụng này?')) return;
  deleteRecord('recruitments', id);
  showAlert('Đã xóa vị trí tuyển dụng', 'success');
  renderRecruitmentTable();
}

renderRecruitmentTable();
