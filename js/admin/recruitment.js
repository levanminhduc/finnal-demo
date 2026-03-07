requireAdmin();
renderHeader();
renderAdminSidebar();

function statusBadge(status) {
  return status === 'Open'
    ? '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Open</span>'
    : '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">Closed</span>';
}

function renderRecruitmentTable() {
  const recruitments = getAll('recruitments');
  const applications = getAll('applications');
  const container = document.getElementById('recruitmentTable');

  if (recruitments.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Chưa có vị trí tuyển dụng nào.</p>';
    return;
  }

  const rows = recruitments.map(r => {
    const appCount = applications.filter(a => a.recruitmentId === r.id).length;
    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm font-medium text-slate-800">${r.title}</td>
        <td class="px-4 py-3 text-sm">${r.department}</td>
        <td class="px-4 py-3 text-sm">${statusBadge(r.status)}</td>
        <td class="px-4 py-3 text-sm">${appCount}</td>
        <td class="px-4 py-3 text-sm">
          <button onclick="openEditModal(${r.id})"
            class="rounded-md bg-slate-800 text-white text-sm px-3 py-1.5 hover:bg-slate-700 mr-1">Sửa</button>
          <button onclick="deleteRecruitment(${r.id})"
            class="rounded-md bg-red-600 text-white text-sm px-3 py-1.5 hover:bg-red-700">Xóa</button>
        </td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tiêu đề</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Phòng ban</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Số ứng viên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
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
