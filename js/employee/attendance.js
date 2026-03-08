requireEmployee();
renderHeader();
renderEmployeeSidebar();

function populateMonthFilter() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const data = getAll('attendance').filter(a => a.employeeId === emp.id);
  const months = [...new Set(data.map(a => (a.date || '').slice(0, 7)))].filter(Boolean).sort().reverse();

  const sel = document.getElementById('filterMonth');
  if (!sel) return;
  
  sel.innerHTML = '<option value="">Tất cả thời gian</option>';
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
  if (status === 'Present') return '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Có mặt</span>';
  if (status === 'Late')    return '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đi trễ</span>';
  return '<span class="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Vắng mặt</span>';
}

function renderMyAttendance() {
  const emp = getCurrentEmployee();
  const container = document.getElementById('attendanceTable');
  if (!container) return;

  if (!emp) {
    container.innerHTML = `
      <div class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
        <p class="text-slate-400 font-medium italic text-sm">Không tìm thấy thông tin nhân viên.</p>
      </div>`;
    return;
  }

  const month = document.getElementById('filterMonth').value;
  let data = getAll('attendance').filter(a => a.employeeId === emp.id);
  if (month) data = data.filter(a => (a.date || '').startsWith(month));

  if (!data.length) {
    container.innerHTML = `
      <div class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
        <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
          ${ICONS.attendance}
        </div>
        <p class="text-slate-400 font-medium italic text-sm">Không có dữ liệu chấm công cho thời gian này.</p>
      </div>`;
    return;
  }

  data.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Summary counts
  const present = data.filter(a => a.status === 'Present').length;
  const late    = data.filter(a => a.status === 'Late').length;
  const absent  = data.filter(a => a.status === 'Absent').length;

  const rows = data.map((a, i) => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-xs font-bold text-slate-400">${i + 1}</td>
      <td class="px-6 py-4 text-sm font-bold text-slate-800">${formatDate(a.date)}</td>
      <td class="px-6 py-4 text-sm font-medium text-emerald-600">${a.checkIn || '—'}</td>
      <td class="px-6 py-4 text-sm font-medium text-amber-600">${a.checkOut || '—'}</td>
      <td class="px-6 py-4 text-sm">${statusBadge(a.status)}</td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="card bg-white p-6 border-none shadow-soft-lg">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Có mặt</p>
        <p class="text-2xl font-black text-emerald-600 tracking-tight">${present}</p>
      </div>
      <div class="card bg-white p-6 border-none shadow-soft-lg">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Đi trễ</p>
        <p class="text-2xl font-black text-amber-600 tracking-tight">${late}</p>
      </div>
      <div class="card bg-white p-6 border-none shadow-soft-lg">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vắng mặt</p>
        <p class="text-2xl font-black text-rose-600 tracking-tight">${absent}</p>
      </div>
      <div class="card bg-white p-6 border-none shadow-soft-lg">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng ngày</p>
        <p class="text-2xl font-black text-slate-900 tracking-tight">${data.length}</p>
      </div>
    </div>

    <div class="card overflow-hidden border-none shadow-soft-lg">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">STT</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Ngày</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Giờ vào</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Giờ ra</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

populateMonthFilter();
renderMyAttendance();
