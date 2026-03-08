requireEmployee();
renderHeader();
renderEmployeeSidebar();

function appStatusBadge(status) {
  if (status === 'Accepted') return '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Accepted</span>';
  if (status === 'Rejected') return '<span class="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Rejected</span>';
  return '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Pending</span>';
}

function renderRecruitmentTable() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const recruitments = getAll('recruitments').filter(r => r.status === 'Open');
  const applications = getAll('applications');
  const container = document.getElementById('recruitmentTable');

  if (recruitments.length === 0) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Hiện không có vị trí tuyển dụng nào đang mở.</p></div>';
    return;
  }

  const rows = recruitments.map(r => {
    const myApp = applications.find(a => a.recruitmentId === r.id && a.employeeId === emp.id);
    const actionCell = myApp
      ? `<div class="flex items-center gap-2 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Đã ứng tuyển ${appStatusBadge(myApp.status)}</div>`
      : `<button onclick="applyRecruitment(${r.id})"
           class="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-300">Ứng tuyển</button>`;

    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-black text-slate-900 tracking-tight">${r.title}</td>
        <td class="px-6 py-4 text-sm font-bold text-primary-600 uppercase tracking-tighter text-xs">${r.department}</td>
        <td class="px-6 py-4 text-sm text-slate-600 font-medium leading-relaxed max-w-xs truncate">${r.description || r.requirements || '—'}</td>
        <td class="px-6 py-4 text-sm">${actionCell}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50/50 border-b border-slate-100">
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiêu đề</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Phòng ban</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">${rows}</tbody>
      </table>
    </div>`;
}

function applyRecruitment(recruitmentId) {
  const emp = getCurrentEmployee();
  if (!emp) return;
  addRecord('applications', { recruitmentId, employeeId: emp.id, status: 'Pending' });
  showAlert('Ứng tuyển thành công', 'success');
  renderRecruitmentTable();
}

renderRecruitmentTable();
