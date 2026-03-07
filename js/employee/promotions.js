requireEmployee();
renderHeader();
renderEmployeeSidebar();

function statusBadge(status) {
  if (status === 'Approved') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Approved</span>';
  if (status === 'Rejected') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Rejected</span>';
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">In Review</span>';
}

function renderPromotionTable() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const promotions = getAll('promotions').filter(p => p.employeeId === emp.id);
  const container = document.getElementById('promotionTable');

  if (promotions.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Chưa có đề xuất thăng tiến.</p>';
    return;
  }

  const rows = promotions.map(p => `
    <tr class="hover:bg-slate-50">
      <td class="px-4 py-3 text-sm">${p.currentPosition || '—'}</td>
      <td class="px-4 py-3 text-sm">${p.nextPosition || p.proposedPosition || '—'}</td>
      <td class="px-4 py-3 text-sm">${statusBadge(p.status)}</td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Vị trí hiện tại</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Vị trí đề xuất</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

renderPromotionTable();
