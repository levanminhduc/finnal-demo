requireEmployee();
renderHeader();
renderEmployeeSidebar();

function statusBadge(status) {
  if (status === 'Resolved') {
    return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">Đã giải quyết</span>';
  }
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Đang chờ</span>';
}

function submitSupport() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const subject = document.getElementById('subjectInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();
  if (!subject) { showAlert('Vui lòng nhập tiêu đề', 'error'); return; }
  if (!message) { showAlert('Vui lòng nhập nội dung', 'error'); return; }
  addRecord('supports', {
    employeeId: emp.id,
    subject,
    message,
    status: 'Pending',
    response: null,
    date: new Date().toISOString().split('T')[0]
  });
  document.getElementById('subjectInput').value = '';
  document.getElementById('messageInput').value = '';
  showAlert('Đã gửi yêu cầu hỗ trợ', 'success');
  renderList();
}

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const supports = getAll('supports').filter(s => s.employeeId === emp.id);
  const tbody = document.getElementById('supportTableBody');
  if (!supports.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có yêu cầu nào</td></tr>';
    return;
  }
  tbody.innerHTML = supports.map(s => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm font-medium">${s.subject || '—'}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(s.status)}</td>
      <td class="px-4 py-3 text-sm text-slate-600">${s.response || '<span class="text-slate-400">Chưa phản hồi</span>'}</td>
    </tr>
  `).join('');
}

renderList();
