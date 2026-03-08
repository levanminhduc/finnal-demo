requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  const trainings = getAll('trainings');
  const tbody = document.getElementById('trainingTableBody');
  if (!trainings.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-12 text-center text-sm text-slate-400 font-medium bg-white rounded-b-3xl border-t border-slate-100">Chưa có khóa đào tạo nào khả dụng.</td></tr>';
    return;
  }
  tbody.innerHTML = trainings.map(t => {
    const attendees = Array.isArray(t.attendees) ? t.attendees : [];
    const registered = attendees.includes(emp.id);
    const actionCell = registered
      ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Đã đăng ký</span>'
      : `<button onclick="registerTraining(${t.id})" class="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-300">Đăng ký</button>`;
    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-black text-slate-900 tracking-tight">${t.title || '—'}</td>
        <td class="px-6 py-4 text-sm text-slate-600 font-medium leading-relaxed max-w-xs">${t.description || '—'}</td>
        <td class="px-6 py-4 text-sm font-bold text-slate-500">${formatDate(t.date)}</td>
        <td class="px-6 py-4 text-sm">${actionCell}</td>
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
