requireAdmin();
renderHeader();
renderAdminSidebar();

function renderLeaveList() {
  const statusFilter = document.getElementById('filterStatus').value;
  let leaves = getAll('leaves');
  if (statusFilter) leaves = leaves.filter(l => l.status === statusFilter);
  const employees = getAll('employees');
  const container = document.getElementById('leaveTable');

  if (leaves.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Không có đơn nghỉ phép nào.</p>';
    return;
  }

  const rows = leaves.map(l => {
    const emp = employees.find(e => e.id === l.employeeId);
    const empName = emp ? emp.name : '—';
    // Support both fromDate/toDate (new) and from/to (seed data)
    const fromDate = l.fromDate || l.from || '—';
    const toDate = l.toDate || l.to || '—';

    let statusBadge;
    if (l.status === 'Approved') {
      statusBadge = '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-emerald-50 text-emerald-700 border border-emerald-100">Approved</span>';
    } else if (l.status === 'Rejected') {
      statusBadge = '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-rose-50 text-rose-700 border border-rose-100">Rejected</span>';
    } else {
      statusBadge = '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-amber-50 text-amber-700 border border-amber-100">Pending</span>';
    }

    const actions = l.status === 'Pending'
      ? `<div class="flex items-center gap-2">
           <button onclick="approveLeave(${l.id})"
             class="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors" title="Duyệt">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
           </button>
           <button onclick="rejectLeave(${l.id})"
             class="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors" title="Từ chối">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
           </button>
         </div>`
      : '<span class="text-slate-400 text-[10px] font-bold uppercase tracking-widest pl-2">Đã xử lý</span>';

    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-800">${empName}</td>
        <td class="px-6 py-4 text-sm text-slate-500 font-mono">${formatDate(fromDate)}</td>
        <td class="px-6 py-4 text-sm text-slate-500 font-mono">${formatDate(toDate)}</td>
        <td class="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">${l.reason || '—'}</td>
        <td class="px-6 py-4 text-sm">${statusBadge}</td>
        <td class="px-6 py-4 text-right">${actions}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="card overflow-hidden mt-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nhân viên</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Từ ngày</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Đến ngày</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lý do</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function approveLeave(id) {
  updateRecord('leaves', id, { status: 'Approved' });
  showAlert('Đã duyệt đơn nghỉ phép', 'success');
  renderLeaveList();
}

function rejectLeave(id) {
  updateRecord('leaves', id, { status: 'Rejected' });
  showAlert('Đã từ chối đơn nghỉ phép', 'success');
  renderLeaveList();
}

renderLeaveList();
