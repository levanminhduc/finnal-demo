requireAdmin();
renderHeader();
renderAdminSidebar();

function loadSettings() {
  const s = JSON.parse(localStorage.getItem('settings')) || {};
  document.getElementById('companyName').value = s.companyName || '';
  document.getElementById('standardWorkDays').value = s.standardWorkDays || '';
  document.getElementById('defaultAllowance').value = s.defaultAllowance || '';
}

function saveSettings() {
  const companyName = document.getElementById('companyName').value.trim();
  const standardWorkDays = parseInt(document.getElementById('standardWorkDays').value, 10);
  const defaultAllowance = parseInt(document.getElementById('defaultAllowance').value, 10);

  if (!companyName) { showAlert('Vui lòng nhập tên công ty', 'error'); return; }
  if (!standardWorkDays || standardWorkDays < 1) { showAlert('Số ngày công không hợp lệ', 'error'); return; }
  if (isNaN(defaultAllowance) || defaultAllowance < 0) { showAlert('Phụ cấp không hợp lệ', 'error'); return; }

  localStorage.setItem('settings', JSON.stringify({ companyName, standardWorkDays, defaultAllowance }));
  showAlert('Lưu thành công', 'success');
}

loadSettings();
