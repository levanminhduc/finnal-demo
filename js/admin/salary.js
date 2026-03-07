requireAdmin();
renderHeader();
renderAdminSidebar();

let editingId = null;

function renderSalaryList() {
  const salaries = getAll('salaries');
  const employees = getAll('employees');
  const container = document.getElementById('salaryTable');

  if (salaries.length === 0) {
    container.innerHTML = '<p class="text-sm text-slate-500 py-4">Chưa có phiếu lương nào.</p>';
    return;
  }

  const rows = salaries.map(s => {
    const emp = employees.find(e => e.id === s.employeeId);
    const empName = emp ? emp.name : '—';
    const statusBadge = s.status === 'Paid'
      ? '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Paid</span>'
      : '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>';
    return `
      <tr class="hover:bg-slate-50">
        <td class="px-4 py-3 text-sm">${empName}</td>
        <td class="px-4 py-3 text-sm">${s.month || '—'}</td>
        <td class="px-4 py-3 text-sm">${formatCurrency(s.base)}</td>
        <td class="px-4 py-3 text-sm">${formatCurrency(s.bonus)}</td>
        <td class="px-4 py-3 text-sm">${formatCurrency(s.deduction)}</td>
        <td class="px-4 py-3 text-sm font-medium">${formatCurrency(s.total)}</td>
        <td class="px-4 py-3 text-sm">${statusBadge}</td>
        <td class="px-4 py-3 text-sm">
          <button onclick="editSalary(${s.id})"
            class="rounded-md bg-slate-800 text-white text-sm px-3 py-1.5 hover:bg-slate-700">
            Sửa
          </button>
        </td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="overflow-x-auto"><table class="w-full bg-white rounded-md shadow overflow-hidden">
      <thead class="bg-slate-100">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Nhân viên</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tháng</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lương cơ bản</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thưởng</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Khấu trừ</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tổng lương</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Trạng thái</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">${rows}</tbody>
    </table></div>`;
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
