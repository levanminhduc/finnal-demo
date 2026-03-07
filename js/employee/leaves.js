requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderMyLeaves() {
  const emp = getCurrentEmployee();
  const container = document.getElementById('leaveTable');

  if (!emp) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Không tìm thấy thông tin nhân viên.</p>';
    return;
  }

  const leaves = getAll('leaves')
    .filter(l => l.employeeId === emp.id)
    .sort((a, b) => b.id - a.id);

  if (leaves.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Chưa có đơn nghỉ phép nào.</p>';
    return;
  }

  const rows = leaves.map(l => {
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

    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm">${formatDate(fromDate)}</td>
        <td class="px-4 py-3 text-sm">${formatDate(toDate)}</td>
        <td class="px-4 py-3 text-sm">${l.reason || '—'}</td>
        <td class="px-4 py-3 text-sm">${statusBadge}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Từ ngày</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Đến ngày</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lý do</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
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
