requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderMyLeaves() {
  const emp = getCurrentEmployee();
  const container = document.getElementById('leaveTable');

  if (!emp) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Không tìm thấy thông tin nhân viên.</p></div>';
    return;
  }

  const leaves = getAll('leaves')
    .filter(l => l.employeeId === emp.id)
    .sort((a, b) => b.id - a.id);

  if (leaves.length === 0) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Chưa có đơn nghỉ phép nào.</p></div>';
    return;
  }

  const rows = leaves.map(l => {
    const fromDate = l.fromDate || l.from || '—';
    const toDate = l.toDate || l.to || '—';

    let statusBadge;
    if (l.status === 'Approved') {
      statusBadge = '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Approved</span>';
    } else if (l.status === 'Rejected') {
      statusBadge = '<span class="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Rejected</span>';
    } else {
      statusBadge = '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Pending</span>';
    }

    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-700">${formatDate(fromDate)}</td>
        <td class="px-6 py-4 text-sm font-bold text-slate-700">${formatDate(toDate)}</td>
        <td class="px-6 py-4 text-sm text-slate-600 font-medium">${l.reason || '—'}</td>
        <td class="px-6 py-4 text-sm">${statusBadge}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50/50 border-b border-slate-100">
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Từ ngày</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Đến ngày</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lý do</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">${rows}</tbody>
      </table>
    </div>`;
}

function submitLeave(event) {
  event.preventDefault();
  const emp = getCurrentEmployee();
  if (!emp) { showAlert('Không tìm thấy thông tin nhân viên', 'error'); return; }

  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;
  const reason = document.getElementById('reason').value.trim();

  if (!fromDate || !toDate || !reason) {
    showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
    return;
  }
  if (fromDate > toDate) {
    showAlert('Ngày bắt đầu phải trước ngày kết thúc', 'error');
    return;
  }

  addRecord('leaves', { employeeId: emp.id, fromDate, toDate, reason, status: 'Pending' });
  showAlert('Gửi đơn nghỉ phép thành công', 'success');
  document.getElementById('leaveForm').reset();
  renderMyLeaves();
}

renderMyLeaves();
