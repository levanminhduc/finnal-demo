requireAdmin();
renderHeader();
renderAdminSidebar();

function populateFilters() {
  const attendance = getAll('attendance');
  const employees = getAll('employees');

  // Unique months sorted descending
  const months = [...new Set(attendance.map(a => a.date.slice(0, 7)))].sort().reverse();
  const monthSel = document.getElementById('filterMonth');
  months.forEach(m => {
    const opt = document.createElement('option');
    const [y, mo] = m.split('-');
    opt.value = m;
    opt.textContent = `Tháng ${parseInt(mo)}/${y}`;
    monthSel.appendChild(opt);
  });
  if (months.length) monthSel.value = months[0];

  // Employee filter
  const empSel = document.getElementById('filterEmployee');
  employees.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e.id;
    opt.textContent = e.name;
    empSel.appendChild(opt);
  });
}

function statusBadge(status) {
  if (status === 'Present') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Có mặt</span>';
  if (status === 'Late')    return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Đi trễ</span>';
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Vắng mặt</span>';
}

function renderAttendanceList() {
  const month = document.getElementById('filterMonth').value;
  const empIdRaw = document.getElementById('filterEmployee').value;
  const empId = empIdRaw ? parseInt(empIdRaw) : null;

  let data = getAll('attendance');
  if (month) data = data.filter(a => a.date.startsWith(month));
  if (empId) data = data.filter(a => a.employeeId === empId);

  const employees = getAll('employees');
  const empMap = {};
  employees.forEach(e => { empMap[e.id] = e.name; });

  if (!data.length) {
    document.getElementById('attendanceTable').innerHTML =
      '<p class="text-sm text-slate-400 py-4">Không có dữ liệu chấm công</p>';
    return;
  }

  // Sort by date desc then employeeId
  data.sort((a, b) => b.date.localeCompare(a.date) || a.employeeId - b.employeeId);

  const rows = data.map((a, i) => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${i + 1}</td>
      <td class="px-4 py-3 text-sm font-medium">${empMap[a.employeeId] || '—'}</td>
      <td class="px-4 py-3 text-sm">${formatDate(a.date)}</td>
      <td class="px-4 py-3 text-sm">${a.checkIn || '—'}</td>
      <td class="px-4 py-3 text-sm">${a.checkOut || '—'}</td>
      <td class="px-4 py-3 text-sm">
        <select onchange="updateAttendanceStatus(${a.id}, this.value)"
          class="rounded border border-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400">
          <option value="Present" ${a.status === 'Present' ? 'selected' : ''}>Có mặt</option>
          <option value="Late"    ${a.status === 'Late'    ? 'selected' : ''}>Đi trễ</option>
          <option value="Absent"  ${a.status === 'Absent'  ? 'selected' : ''}>Vắng mặt</option>
        </select>
      </td>
    </tr>`).join('');

  document.getElementById('attendanceTable').innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">STT</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nhân viên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Ngày</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Giờ vào</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Giờ ra</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

function updateAttendanceStatus(id, status) {
  updateRecord('attendance', id, { status });
  showAlert('Cập nhật trạng thái thành công', 'success');
}

populateFilters();
renderAttendanceList();
