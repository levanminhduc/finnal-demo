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
  if (status === 'Present') return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-emerald-50 text-emerald-700 border border-emerald-100">Có mặt</span>';
  if (status === 'Late')    return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-amber-50 text-amber-700 border border-amber-100">Đi trễ</span>';
  return '<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter bg-rose-50 text-rose-700 border border-rose-100">Vắng mặt</span>';
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
      '<div class="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 mt-4"><p class="text-sm text-slate-400 font-medium">Không có dữ liệu chấm công</p></div>';
    return;
  }

  // Sort by date desc then employeeId
  data.sort((a, b) => b.date.localeCompare(a.date) || a.employeeId - b.employeeId);

  const rows = data.map((a, i) => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm text-slate-500 font-medium">${i + 1}</td>
      <td class="px-6 py-4 text-sm font-bold text-slate-900">${empMap[a.employeeId] || '—'}</td>
      <td class="px-6 py-4 text-sm text-slate-600">${formatDate(a.date)}</td>
      <td class="px-6 py-4 text-sm font-mono text-slate-500">${a.checkIn || '—'}</td>
      <td class="px-6 py-4 text-sm font-mono text-slate-500">${a.checkOut || '—'}</td>
      <td class="px-6 py-4 text-sm">
        <select onchange="updateAttendanceStatus(${a.id}, this.value)"
          class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
          <option value="Present" ${a.status === 'Present' ? 'selected' : ''}>CÓ MẶT</option>
          <option value="Late"    ${a.status === 'Late'    ? 'selected' : ''}>ĐI TRỄ</option>
          <option value="Absent"  ${a.status === 'Absent'  ? 'selected' : ''}>VẮNG MẶT</option>
        </select>
      </td>
    </tr>`).join('');

  document.getElementById('attendanceTable').innerHTML = `
    <div class="card overflow-hidden mt-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">STT</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nhân viên</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Giờ vào</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Giờ ra</th>
              <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function updateAttendanceStatus(id, status) {
  updateRecord('attendance', id, { status });
  showAlert('Cập nhật trạng thái thành công', 'success');
}

populateFilters();
renderAttendanceList();
