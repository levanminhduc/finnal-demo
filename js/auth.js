// Lấy user đang đăng nhập
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Lấy employee profile của user hiện tại
function getCurrentEmployee() {
  const user = getCurrentUser();
  if (!user) return null;
  return getAll('employees').find(e => e.userId === user.id) || null;
}

// Kiểm tra quyền admin — skeleton, hoàn thiện ở Phase 2
function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') window.location.href = '../login.html';
}

// Kiểm tra quyền employee — skeleton, hoàn thiện ở Phase 2
function requireEmployee() {
  const user = getCurrentUser();
  if (!user || user.role !== 'employee') window.location.href = '../login.html';
}

// Đăng nhập
function login(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) { showAlert('Vui lòng nhập đầy đủ thông tin', 'error'); return; }
  const users = getAll('users');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) { showAlert('Email hoặc mật khẩu không đúng', 'error'); return; }
  if (user.status !== 'active') { showAlert('Tài khoản đã bị khóa', 'error'); return; }
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = user.role === 'admin' ? 'admin/dashboard.html' : 'employee/dashboard.html';
}

// Đăng ký
function register(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  if (!name || !email || !password || !confirmPassword) { showAlert('Vui lòng nhập đầy đủ thông tin', 'error'); return; }
  if (password !== confirmPassword) { showAlert('Mật khẩu xác nhận không khớp', 'error'); return; }
  const users = getAll('users');
  if (users.find(u => u.email === email)) { showAlert('Email đã được sử dụng', 'error'); return; }
  const userId = addRecord('users', { email, password, role: 'employee', status: 'active' });
  addRecord('employees', { userId, name, gender: '', dob: '', phone: '', address: '', department: 'Chưa phân công', position: 'Nhân viên mới', joinDate: new Date().toISOString().split('T')[0] });
  showAlert('Đăng ký thành công! Vui lòng đăng nhập', 'success');
  setTimeout(() => { window.location.href = 'login.html'; }, 1500);
}

// Đăng xuất
function logout() {
  localStorage.removeItem('currentUser');
  const path = window.location.pathname;
  if (path.includes('/admin/') || path.includes('/employee/')) {
    window.location.href = '../login.html';
  } else {
    window.location.href = 'login.html';
  }
}
