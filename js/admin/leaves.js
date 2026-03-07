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
      statusBadge = '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Approved</span>';
    } else if (l.status === 'Rejected') {
      statusBadge = '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Rejected</span>';
    } else {
      statusBadge = '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>';
    }

    const actions = l.status === 'Pending'
      ? `<button onclick="approveLeave(${l.id})"
           class="rounded-md bg-green-600 text-white text-sm px-3 py-1.5 hover:bg-green-700 mr-1">
           Duyệt
         </button>
         <button onclick="rejectLeave(${l.id})"
           class="rounded-md bg-red-600 text-white text-sm px-3 py-1.5 hover:bg-red-700">
           Từ chối
         </button>`
      : '<span class="text-slate-400 text-xs">—</span>';

    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm">${empName}</td>
        <td class="px-4 py-3 text-sm">${formatDate(fromDate)}</td>
        <td class="px-4 py-3 text-sm">${formatDate(toDate)}</td>
        <td class="px-4 py-3 text-sm">${l.reason || '—'}</td>
        <td class="px-4 py-3 text-sm">${statusBadge}</td>
        <td class="px-4 py-3 text-sm">${actions}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nhân viên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Từ ngày</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Đến ngày</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lý do</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
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
