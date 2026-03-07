requireEmployee();
renderHeader();
renderEmployeeSidebar();

function appStatusBadge(status) {
  if (status === 'Accepted') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">Accepted</span>';
  if (status === 'Rejected') return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Rejected</span>';
  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>';
}

function renderRecruitmentTable() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const recruitments = getAll('recruitments').filter(r => r.status === 'Open');
  const applications = getAll('applications');
  const container = document.getElementById('recruitmentTable');

  if (recruitments.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Hiện không có vị trí tuyển dụng nào đang mở.</p>';
    return;
  }

  const rows = recruitments.map(r => {
    const myApp = applications.find(a => a.recruitmentId === r.id && a.employeeId === emp.id);
    const actionCell = myApp
      ? `<span class="text-slate-500 text-sm">Đã ứng tuyển</span> ${appStatusBadge(myApp.status)}`
      : `<button onclick="applyRecruitment(${r.id})"
           class="rounded-md bg-slate-800 text-white text-sm px-3 py-1.5 hover:bg-slate-700">Ứng tuyển</button>`;

    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm font-medium text-slate-800">${r.title}</td>
        <td class="px-4 py-3 text-sm">${r.department}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${r.description || r.requirements || '—'}</td>
        <td class="px-4 py-3 text-sm">${actionCell}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tiêu đề</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Phòng ban</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Mô tả</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
}

function applyRecruitment(recruitmentId) {
  const emp = getCurrentEmployee();
  if (!emp) return;
  addRecord('applications', { recruitmentId, employeeId: emp.id, status: 'Pending' });
  showAlert('Ứng tuyển thành công', 'success');
  renderRecruitmentTable();
}

renderRecruitmentTable();
