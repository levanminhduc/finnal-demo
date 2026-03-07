requireEmployee();
renderHeader();
renderEmployeeSidebar();

function populateMonthFilter() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const data = getAll('attendance').filter(a => a.employeeId === emp.id);
  const months = [...new Set(data.map(a => a.date.slice(0, 7)))].sort().reverse();

  const sel = document.getElementById('filterMonth');
  months.forEach(m => {
    const opt = document.createElement('option');
    const [y, mo] = m.split('-');
    opt.value = m;
    opt.textContent = `Tháng ${parseInt(mo)}/${y}`;
    sel.appendChild(opt);
  });
  if (months.length) sel.value = months[0];
}

function statusBadge(status) {
  if (status === 'Present') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Có mặt</span>';
  if (status === 'Late')    return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Đi trễ</span>';
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Vắng mặt</span>';
}

function renderMyAttendance() {
  const emp = getCurrentEmployee();
  if (!emp) {
    document.getElementById('attendanceTable').innerHTML =
      '<p class="text-sm text-slate-400 py-4">Không tìm thấy thông tin nhân viên.</p>';
    return;
  }

  const month = document.getElementById('filterMonth').value;
  let data = getAll('attendance').filter(a => a.employeeId === emp.id);
  if (month) data = data.filter(a => a.date.startsWith(month));

  if (!data.length) {
    document.getElementById('attendanceTable').innerHTML =
      '<p class="text-sm text-slate-400 py-4">Không có dữ liệu chấm công.</p>';
    return;
  }

  data.sort((a, b) => b.date.localeCompare(a.date));

  // Summary counts
  const present = data.filter(a => a.status === 'Present').length;
  const late    = data.filter(a => a.status === 'Late').length;
  const absent  = data.filter(a => a.status === 'Absent').length;

  const rows = data.map((a, i) => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${i + 1}</td>
      <td class="px-4 py-3 text-sm">${formatDate(a.date)}</td>
      <td class="px-4 py-3 text-sm">${a.checkIn || '—'}</td>
      <td class="px-4 py-3 text-sm">${a.checkOut || '—'}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(a.status)}</td>
    </tr>`).join('');

  document.getElementById('attendanceTable').innerHTML = `
    <div class="flex gap-3 mb-4">
      <div class="bg-white rounded-md shadow px-4 py-3 flex-1 text-center">
        <p class="text-xs text-slate-500 mb-1">Có mặt</p>
        <p class="text-lg font-bold text-green-600">${present}</p>
      </div>
      <div class="bg-white rounded-md shadow px-4 py-3 flex-1 text-center">
        <p class="text-xs text-slate-500 mb-1">Đi trễ</p>
        <p class="text-lg font-bold text-yellow-500">${late}</p>
      </div>
      <div class="bg-white rounded-md shadow px-4 py-3 flex-1 text-center">
        <p class="text-xs text-slate-500 mb-1">Vắng mặt</p>
        <p class="text-lg font-bold text-red-600">${absent}</p>
      </div>
      <div class="bg-white rounded-md shadow px-4 py-3 flex-1 text-center">
        <p class="text-xs text-slate-500 mb-1">Tổng ngày</p>
        <p class="text-lg font-bold text-slate-700">${data.length}</p>
      </div>
    </div>
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">STT</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Ngày</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Giờ vào</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Giờ ra</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

populateMonthFilter();
renderMyAttendance();
