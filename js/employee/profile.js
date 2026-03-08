requireEmployee();
renderHeader();
renderEmployeeSidebar();

let isEditing = false;

function renderProfile() {
  const emp = getCurrentEmployee();
  const user = getCurrentUser();

  if (!emp) {
    document.getElementById('profileCard').innerHTML =
      '<div class="text-center py-12"><p class="text-sm text-slate-400 font-medium">Không tìm thấy thông tin nhân viên.</p></div>';
    return;
  }

  document.getElementById('profileCard').innerHTML = `
    <div class="card bg-white p-8 border-none shadow-soft-lg">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm">
          ${ICONS.profile}
        </div>
        <div>
          <h3 class="text-xl font-black text-slate-900 tracking-tight">Hồ sơ cá nhân</h3>
          <p class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Chi tiết thông tin nhân viên</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6 text-left">
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Họ tên</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${emp.name}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Giới tính</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${emp.gender || '—'}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Ngày sinh</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${formatDate(emp.dob)}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Số điện thoại</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${emp.phone || '—'}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Địa chỉ</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${emp.address || '—'}</div>
          </div>
        </div>
        <div class="space-y-6 text-left">
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Phòng ban</span>
            <div class="p-4 rounded-2xl bg-primary-50/30 border border-primary-100 text-sm font-black text-primary-700 group-hover:bg-white group-hover:shadow-sm transition-all">${emp.department || '—'}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Chức vụ</span>
            <div class="p-4 rounded-2xl bg-indigo-50/30 border border-indigo-100 text-sm font-black text-indigo-700 group-hover:bg-white group-hover:shadow-sm transition-all">${emp.position || '—'}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Ngày vào làm</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${formatDate(emp.joinDate)}</div>
          </div>
          <div class="group">
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 group-hover:text-primary-500 transition-colors">Email</span>
            <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-sm font-bold text-slate-700 group-hover:bg-white group-hover:shadow-sm transition-all">${user ? user.email : '—'}</div>
          </div>
        </div>
      </div>
    </div>`;
}

function toggleEdit() {
  isEditing = true;
  const emp = getCurrentEmployee();
  if (!emp) return;

  document.getElementById('editName').value = emp.name || '';
  document.getElementById('editGender').value = emp.gender || 'Nam';
  document.getElementById('editDob').value = emp.dob || '';
  document.getElementById('editPhone').value = emp.phone || '';
  document.getElementById('editAddress').value = emp.address || '';

  document.getElementById('editForm').classList.remove('hidden');
  document.getElementById('editBtn').classList.add('hidden');
}

function cancelEdit() {
  isEditing = false;
  document.getElementById('editForm').classList.add('hidden');
  document.getElementById('editBtn').classList.remove('hidden');
}

function saveProfile() {
  const emp = getCurrentEmployee();
  if (!emp) return;

  const name = document.getElementById('editName').value.trim();
  if (!name) { showAlert('Vui lòng nhập họ tên', 'error'); return; }

  const updated = {
    name,
    gender: document.getElementById('editGender').value,
    dob: document.getElementById('editDob').value,
    phone: document.getElementById('editPhone').value.trim(),
    address: document.getElementById('editAddress').value.trim()
  };

  updateRecord('employees', emp.id, updated);

  // Refresh currentUser display name via re-render
  cancelEdit();
  showAlert('Cập nhật thành công', 'success');
  renderProfile();
}

renderProfile();
