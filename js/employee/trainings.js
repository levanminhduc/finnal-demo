requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const trainings = getAll('trainings');
  const tbody = document.getElementById('trainingTableBody');
  if (!trainings.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">Chưa có khóa đào tạo</td></tr>';
    return;
  }
  tbody.innerHTML = trainings.map(t => {
    const attendees = Array.isArray(t.attendees) ? t.attendees : [];
    const registered = attendees.includes(emp.id);
    const actionCell = registered
      ? '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Đã đăng ký</span>'
      : `<button onclick="registerTraining(${t.id})" class="rounded-md bg-slate-800 text-white text-xs px-3 py-1 hover:bg-slate-700">Đăng ký</button>`;
    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm font-medium">${t.title || '—'}</td>
        <td class="px-4 py-3 text-sm text-slate-600">${t.description || '—'}</td>
        <td class="px-4 py-3 text-sm">${formatDate(t.date)}</td>
        <td class="px-4 py-3 text-sm">${actionCell}</td>
      </tr>
    `;
  }).join('');
}

function registerTraining(id) {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const training = getAll('trainings').find(t => t.id === id);
  if (!training) return;
  const attendees = Array.isArray(training.attendees) ? training.attendees : [];
  if (attendees.includes(emp.id)) { showAlert('Bạn đã đăng ký khóa này rồi', 'warning'); return; }
  attendees.push(emp.id);
  updateRecord('trainings', id, { attendees });
  showAlert('Đăng ký thành công', 'success');
  renderList();
}

renderList();
