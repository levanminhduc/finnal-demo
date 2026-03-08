requireEmployee();
renderHeader();
renderEmployeeSidebar();

function statusBadge(status) {
  if (status === 'Approved') return '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Approved</span>';
  if (status === 'Rejected') return '<span class="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Rejected</span>';
  return '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">In Review</span>';
}

function renderPromotionTable() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const promotions = getAll('promotions').filter(p => p.employeeId === emp.id);
  const container = document.getElementById('promotionTable');

  if (promotions.length === 0) {
    container.innerHTML = '<div class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Chưa có đề xuất thăng tiến nào.</p></div>';
    return;
  }

  const rows = promotions.map(p => `
    <tr class="group hover:bg-slate-50/80 transition-colors">
      <td class="px-6 py-4 text-sm font-bold text-slate-500">${p.currentPosition || '—'}</td>
      <td class="px-6 py-4 text-sm font-black text-slate-900 tracking-tight">
        <div class="flex items-center gap-2">
          <span class="text-primary-600">${ICONS.promotions}</span>
          ${p.nextPosition || p.proposedPosition || '—'}
        </div>
      </td>
      <td class="px-6 py-4 text-sm">${statusBadge(p.status)}</td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50/50 border-b border-slate-100">
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Vị trí hiện tại</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Vị trí đề xuất</th>
            <th class="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">${rows}</tbody>
      </table>
    </div>`;
}

renderPromotionTable();
