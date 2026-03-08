requireEmployee();
renderHeader();
renderEmployeeSidebar();

function statusBadge(status) {
  if (status === 'Resolved') {
    return '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đã giải quyết</span>';
  }
  return '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đang chờ</span>';
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
    tbody.innerHTML = '<tr><td colspan="3" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-white rounded-b-3xl border-t border-slate-100">Chưa có yêu cầu hỗ trợ nào.</td></tr>';
    return;
  }
  tbody.innerHTML = supports.map(s => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-black text-slate-900 tracking-tight">${s.subject || '—'}</td>
      <td class="px-6 py-4 text-sm">${statusBadge(s.status)}</td>
      <td class="px-6 py-4 text-sm text-slate-600 font-medium">${s.response || '<span class="text-slate-400 italic">Chưa phản hồi</span>'}</td>
    </tr>
  `).join('');
}

renderList();
