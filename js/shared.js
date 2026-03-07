// ===== MENU ITEMS =====
const adminMenuItems = [
  { href: 'dashboard.html',     icon: '▦', label: 'Tổng quan' },
  { href: 'employees.html',     icon: '👥', label: 'Nhân viên' },
  { href: 'attendance.html',    icon: '📋', label: 'Chấm công' },
  { href: 'salary.html',        icon: '💰', label: 'Lương thưởng' },
  { href: 'leaves.html',        icon: '🏖', label: 'Nghỉ phép' },
  { href: 'evaluations.html',   icon: '⭐', label: 'Đánh giá' },
  { href: 'trainings.html',     icon: '📚', label: 'Đào tạo' },
  { href: 'benefits.html',      icon: '🎁', label: 'Phúc lợi' },
  { href: 'contracts.html',     icon: '📄', label: 'Hợp đồng' },
  { href: 'notifications.html', icon: '🔔', label: 'Thông báo' },
  { href: 'supports.html',      icon: '🛠', label: 'Hỗ trợ' },
  { href: 'security.html',      icon: '🔒', label: 'Bảo mật' },
  { href: 'reports.html',       icon: '📊', label: 'Báo cáo' },
  { href: 'settings.html',      icon: '⚙', label: 'Cài đặt' },
  { href: 'recruitment.html',   icon: '🔍', label: 'Tuyển dụng' },
  { href: 'promotions.html',    icon: '🚀', label: 'Thăng tiến' }
];

const employeeMenuItems = [
  { href: 'dashboard.html',     icon: '▦', label: 'Tổng quan' },
  { href: 'profile.html',       icon: '👤', label: 'Hồ sơ' },
  { href: 'attendance.html',    icon: '📋', label: 'Chấm công' },
  { href: 'salary.html',        icon: '💰', label: 'Lương' },
  { href: 'leaves.html',        icon: '🏖', label: 'Nghỉ phép' },
  { href: 'evaluations.html',   icon: '⭐', label: 'Đánh giá' },
  { href: 'trainings.html',     icon: '📚', label: 'Đào tạo' },
  { href: 'benefits.html',      icon: '🎁', label: 'Phúc lợi' },
  { href: 'contracts.html',     icon: '📄', label: 'Hợp đồng' },
  { href: 'notifications.html', icon: '🔔', label: 'Thông báo' },
  { href: 'supports.html',      icon: '🛠', label: 'Hỗ trợ' },
  { href: 'reports.html',       icon: '📊', label: 'Báo cáo' },
  { href: 'account.html',       icon: '🔑', label: 'Tài khoản' },
  { href: 'recruitment.html',   icon: '🔍', label: 'Tuyển dụng' },
  { href: 'promotions.html',    icon: '🚀', label: 'Thăng tiến' }
];

// ===== SIDEBAR =====
function renderSidebar(menuItems, containerId) {
  const currentPage = window.location.pathname.split('/').pop();
  const container = document.getElementById(containerId || 'sidebar');
  if (!container) return;

  const ul = document.createElement('ul');
  ul.className = 'space-y-1 text-sm';

  menuItems.forEach(item => {
    const isActive = item.href === currentPage;
    const li = document.createElement('li');
    li.innerHTML = `<a href="${item.href}"
      class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors
             ${isActive
               ? 'bg-slate-800 text-white'
               : 'text-slate-700 hover:bg-slate-100'}"
    >
      <span>${item.icon}</span>
      <span>${item.label}</span>
    </a>`;
    ul.appendChild(li);
  });

  container.innerHTML = '';
  container.appendChild(ul);
}

function renderAdminSidebar() {
  renderSidebar(adminMenuItems);
}

function renderEmployeeSidebar() {
  renderSidebar(employeeMenuItems);
}

// ===== MOBILE SIDEBAR TOGGLE =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar || !overlay) return;

  const isOpen = !sidebar.classList.contains('-translate-x-full');
  if (isOpen) {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  } else {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  }
}

// ===== HEADER =====
function renderHeader() {
  const container = document.getElementById('header');
  if (!container) return;

  const user = getCurrentUser();
  const emp = getCurrentEmployee();
  const displayName = emp ? emp.name : (user ? user.email : 'Người dùng');

  container.innerHTML = `
    <div class="flex items-center gap-3">
      <button onclick="toggleSidebar()" class="md:hidden rounded-md p-1.5 text-slate-600 hover:bg-slate-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <span class="font-bold text-slate-800">HR Management System</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="text-sm text-slate-600 hidden sm:inline">Xin chào, <strong>${displayName}</strong></span>
      <button onclick="logout()"
        class="rounded-md border border-slate-300 text-slate-700 text-sm px-3 py-1.5 hover:bg-slate-50">
        Đăng xuất
      </button>
    </div>
  `;
}

// ===== UTILITIES =====
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function formatCurrency(amount) {
  if (amount == null) return '—';
  return amount.toLocaleString('vi-VN') + ' đ';
}

function showAlert(message, type) {
  const colors = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error:   'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };
  const colorClass = colors[type] || colors.success;

  const div = document.createElement('div');
  div.className = `fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-md border shadow text-sm font-medium ${colorClass}`;
  div.textContent = message;
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('hidden');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('hidden');
}
