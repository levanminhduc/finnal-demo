requireAdmin();
renderHeader();
renderAdminSidebar();

let viewingId = null;

function getEmpName(empId) {
  const emp = getAll('employees').find(e => e.id === empId);
  return emp ? emp.name : 'Không xác định';
}

function statusBadge(status) {
  if (status === 'Resolved') {
    return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">Đã giải quyết</span>';
  }
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Đang chờ</span>';
}

function renderList() {
  const supports = getAll('supports');
  const tbody = document.getElementById('supportTableBody');
  if (!supports.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có dữ liệu</td></tr>';
    return;
  }
  tbody.innerHTML = supports.map(s => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${getEmpName(s.employeeId)}</td>
      <td class="px-4 py-3 text-sm font-medium">${s.subject || s.content || '—'}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(s.status)}</td>
      <td class="px-4 py-3 text-sm">
        <button onclick="viewItem(${s.id})" class="text-slate-600 hover:text-slate-900">Xem</button>
      </td>
    </tr>
  `).join('');
}

function viewItem(id) {
  const s = getAll('supports').find(s => s.id === id);
  if (!s) return;
  viewingId = id;
  document.getElementById('viewSubject').textContent = s.subject || s.content || '—';
  document.getElementById('viewMessage').textContent = s.message || s.content || '—';
  document.getElementById('responseInput').value = s.response || '';
  openModal('supportModal');
}

function resolveSupport() {
  const response = document.getElementById('responseInput').value.trim();
  if (!response) { showAlert('Vui lòng nhập nội dung phản hồi', 'error'); return; }
  updateRecord('supports', viewingId, { response, status: 'Resolved' });
  showAlert('Đã gửi phản hồi', 'success');
  closeModal('supportModal');
  renderList();
}

renderList();
