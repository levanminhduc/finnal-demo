requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderSalaryList() {
  const salaries = getAll('salaries');
  const employees = getAll('employees');
  const container = document.getElementById('salaryTable');

  if (salaries.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
        <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
          ${ICONS.salary}
        </div>
        <p class="text-slate-500 font-medium">Chưa có phiếu lương nào.</p>
      </div>`;
    return;
  }

  const rows = salaries.map(s => {
    const emp = employees.find(e => e.id === s.employeeId);
    const empName = emp ? emp.name : '—';
    const statusBadge = s.status === 'Paid'
      ? '<span class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Paid</span>'
      : '<span class="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter">Pending</span>';
    
    return `
      <tr class="group hover:bg-slate-50/80 transition-colors">
        <td class="px-6 py-4 text-sm font-bold text-slate-800">${empName}</td>
        <td class="px-6 py-4 text-sm text-slate-600 font-medium">${s.month || '—'}</td>
        <td class="px-6 py-4 text-sm text-slate-600">${formatCurrency(s.base)}</td>
        <td class="px-6 py-4 text-sm text-emerald-600 font-medium">+${formatCurrency(s.bonus)}</td>
        <td class="px-6 py-4 text-sm text-rose-600 font-medium">-${formatCurrency(s.deduction)}</td>
        <td class="px-6 py-4 text-sm font-black text-slate-900">${formatCurrency(s.total)}</td>
        <td class="px-6 py-4 text-sm">${statusBadge}</td>
        <td class="px-6 py-4 text-sm text-right">
          <button onclick="editSalary(${s.id})"
            class="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
            title="Sửa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Nhân viên</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Tháng</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Lương cơ bản</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Thưởng</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Khấu trừ</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Tổng lương</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4">Trạng thái</th>
              <th class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function populateEmployeeSelect(selectedId) {
  const employees = getAll('employees');
  document.getElementById('empSelect').innerHTML =
    '<option value="">-- Chọn nhân viên --</option>' +
    employees.map(e =>
      `<option value="${e.id}" ${e.id === selectedId ? 'selected' : ''}>${e.name}</option>`
    ).join('');
}

function calcTotal() {
  const base = parseInt(document.getElementById('baseInput').value) || 0;
  const bonus = parseInt(document.getElementById('bonusInput').value) || 0;
  const deduction = parseInt(document.getElementById('deductionInput').value) || 0;
  document.getElementById('totalDisplay').value = formatCurrency(base + bonus - deduction);
}

function openAddSalary() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Thêm phiếu lương';
  document.getElementById('monthInput').value = '';
  document.getElementById('baseInput').value = '';
  document.getElementById('bonusInput').value = '0';
  document.getElementById('deductionInput').value = '0';
  document.getElementById('totalDisplay').value = '';
  document.getElementById('statusSelect').value = 'Pending';
  populateEmployeeSelect(null);
  openModal('modal');
}

function editSalary(id) {
  editingId = id;
  const sal = getAll('salaries').find(s => s.id === id);
  if (!sal) return;
  document.getElementById('modalTitle').textContent = 'Cập nhật phiếu lương';
  populateEmployeeSelect(sal.employeeId);
  document.getElementById('monthInput').value = sal.month || '';
  document.getElementById('baseInput').value = sal.base || 0;
  document.getElementById('bonusInput').value = sal.bonus || 0;
  document.getElementById('deductionInput').value = sal.deduction || 0;
  document.getElementById('statusSelect').value = sal.status || 'Pending';
  calcTotal();
  openModal('modal');
}

function saveSalary() {
  const employeeId = parseInt(document.getElementById('empSelect').value);
  const month = document.getElementById('monthInput').value;
  const base = parseInt(document.getElementById('baseInput').value) || 0;
  const bonus = parseInt(document.getElementById('bonusInput').value) || 0;
  const deduction = parseInt(document.getElementById('deductionInput').value) || 0;
  const total = base + bonus - deduction;
  const status = document.getElementById('statusSelect').value;

  if (!employeeId || !month || !base) {
    showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
    return;
  }

  if (editingId) {
    updateRecord('salaries', editingId, { employeeId, month, base, bonus, deduction, total, status });
    showAlert('Cập nhật thành công', 'success');
  } else {
    addRecord('salaries', { employeeId, month, base, bonus, deduction, total, status });
    showAlert('Thêm phiếu lương thành công', 'success');
  }

  closeModal('modal');
  renderSalaryList();
}

renderSalaryList();
