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
    return '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đã giải quyết</span>';
  }
  return '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đang chờ</span>';
}

function renderList() {
  const supports = getAll('supports');
  const tbody = document.getElementById('supportTableBody');
  if (!supports.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="px-6 py-20 text-center">
          <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
            ${ICONS.supports}
          </div>
          <p class="text-slate-400 font-medium italic text-sm">Chưa có yêu cầu hỗ trợ nào</p>
        </td>
      </tr>`;
    return;
  }
  tbody.innerHTML = supports.map(s => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${getEmpName(s.employeeId)}</td>
      <td class="px-6 py-4 text-sm font-medium text-slate-600">${s.subject || s.content || '—'}</td>
      <td class="px-6 py-4 text-sm">${statusBadge(s.status)}</td>
      <td class="px-6 py-4 text-sm text-right">
        <button onclick="viewItem(${s.id})"
          class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
          title="Xem chi tiết">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
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
