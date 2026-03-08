// ===== ICONS =====
const ICONS = {
  dashboard: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
  employees: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
  attendance: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>',
  salary: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  leaves: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
  evaluations: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
  trainings: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
  benefits: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  contracts: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  notifications: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
  supports: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
  security: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  reports: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
  settings: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  recruitment: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>',
  promotions: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
  profile: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  account: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>'
};

// ===== MENU ITEMS =====
const adminMenuItems = [
  { href: 'dashboard.html',     icon: ICONS.dashboard, label: 'Tổng quan' },
  { href: 'employees.html',     icon: ICONS.employees, label: 'Nhân viên' },
  { href: 'attendance.html',    icon: ICONS.attendance, label: 'Chấm công' },
  { href: 'salary.html',        icon: ICONS.salary, label: 'Lương thưởng' },
  { href: 'leaves.html',        icon: ICONS.leaves, label: 'Nghỉ phép' },
  { href: 'evaluations.html',   icon: ICONS.evaluations, label: 'Đánh giá' },
  { href: 'trainings.html',     icon: ICONS.trainings, label: 'Đào tạo' },
  { href: 'benefits.html',      icon: ICONS.benefits, label: 'Phúc lợi' },
  { href: 'contracts.html',     icon: ICONS.contracts, label: 'Hợp đồng' },
  { href: 'notifications.html', icon: ICONS.notifications, label: 'Thông báo' },
  { href: 'supports.html',      icon: ICONS.supports, label: 'Hỗ trợ' },
  { href: 'security.html',      icon: ICONS.security, label: 'Bảo mật' },
  { href: 'reports.html',       icon: ICONS.reports, label: 'Báo cáo' },
  { href: 'settings.html',      icon: ICONS.settings, label: 'Cài đặt' },
  { href: 'recruitment.html',   icon: ICONS.recruitment, label: 'Tuyển dụng' },
  { href: 'promotions.html',    icon: ICONS.promotions, label: 'Thăng tiến' }
];

const employeeMenuItems = [
  { href: 'dashboard.html',     icon: ICONS.dashboard, label: 'Tổng quan' },
  { href: 'profile.html',       icon: ICONS.profile, label: 'Hồ sơ' },
  { href: 'attendance.html',    icon: ICONS.attendance, label: 'Chấm công' },
  { href: 'salary.html',        icon: ICONS.salary, label: 'Lương' },
  { href: 'leaves.html',        icon: ICONS.leaves, label: 'Nghỉ phép' },
  { href: 'evaluations.html',   icon: ICONS.evaluations, label: 'Đánh giá' },
  { href: 'trainings.html',     icon: ICONS.trainings, label: 'Đào tạo' },
  { href: 'benefits.html',      icon: ICONS.benefits, label: 'Phúc lợi' },
  { href: 'contracts.html',     icon: ICONS.contracts, label: 'Hợp đồng' },
  { href: 'notifications.html', icon: ICONS.notifications, label: 'Thông báo' },
  { href: 'supports.html',      icon: ICONS.supports, label: 'Hỗ trợ' },
  { href: 'reports.html',       icon: ICONS.reports, label: 'Báo cáo' },
  { href: 'account.html',       icon: ICONS.account, label: 'Tài khoản' },
  { href: 'recruitment.html',   icon: ICONS.recruitment, label: 'Tuyển dụng' },
  { href: 'promotions.html',    icon: ICONS.promotions, label: 'Thăng tiến' }
];

// ===== SIDEBAR =====
function renderSidebar(menuItems, containerId) {
  const currentPage = window.location.pathname.split('/').pop();
  const container = document.getElementById(containerId || 'sidebar');
  if (!container) return;

  // Persistence for desktop collapse state
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  const sidebarWidthClass = isCollapsed ? 'md:w-20' : 'md:w-64';

  // Modern Sidebar Wrapper
  container.className = `fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 shadow-2xl transform -translate-x-full transition-all duration-300 ease-in-out md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 md:flex md:flex-col md:shadow-none shrink-0 overflow-hidden ${sidebarWidthClass}`;
  
  const logoSection = `
    <div class="flex items-center border-b border-slate-800 transition-all duration-300 ${isCollapsed ? 'flex-col py-4 gap-4' : 'p-6 justify-between'}">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20 shrink-0">H</div>
        <span class="font-bold text-white tracking-tight text-lg transition-all duration-300 ${isCollapsed ? 'md:hidden' : 'opacity-100'}">HR Portal</span>
      </div>
      <button onclick="toggleDesktopSidebar()" class="hidden md:flex p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
        <svg class="w-5 h-5 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>
    </div>
  `;

  const ul = document.createElement('ul');
  ul.className = `flex-1 overflow-y-auto py-6 space-y-1.5 custom-scrollbar transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`;

  menuItems.forEach(item => {
    const isActive = item.href === currentPage;
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${item.href}" title="${isCollapsed ? item.label : ''}"
        class="group flex items-center gap-3 rounded-xl transition-all duration-200
               ${isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-2.5'}
               ${isActive
                 ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                 : 'hover:bg-slate-800 hover:text-white'}"
      >
        <span class="${isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary-400'} transition-colors shrink-0">${item.icon}</span>
        <span class="font-medium text-sm whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'md:hidden' : 'opacity-100'}">${item.label}</span>
        ${(isActive && !isCollapsed) ? '<span class="ml-auto w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300"></span>' : ''}
      </a>`;
    ul.appendChild(li);
  });

  const footerSection = `
    <div class="p-4 mt-auto border-t border-slate-800 transition-all duration-300 ${isCollapsed ? 'md:p-2' : 'p-4'}">
      <div class="bg-slate-800/50 rounded-xl p-4 flex flex-col items-center overflow-hidden">
        <p class="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1 transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:h-0' : 'opacity-100'} text-center">Phiên bản</p>
        <p class="text-xs text-slate-300 font-medium whitespace-nowrap">${isCollapsed ? 'v2.4' : 'v2.4.0 — 2026'}</p>
      </div>
    </div>
  `;

  container.innerHTML = logoSection;
  container.appendChild(ul);
  container.insertAdjacentHTML('beforeend', footerSection);
}

function toggleDesktopSidebar() {
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  localStorage.setItem('sidebarCollapsed', !isCollapsed);
  
  // Re-render based on current role
  const user = getCurrentUser();
  if (user && user.role === 'admin') {
    renderAdminSidebar();
  } else {
    renderEmployeeSidebar();
  }
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
  const userRole = user ? (user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên') : 'Khách';

  // Apply header styles
  container.className = "bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-40 h-16";

  container.innerHTML = `
    <div class="flex items-center gap-4">
      <button onclick="toggleSidebar()" class="md:hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <div class="flex flex-col">
        <span class="text-xs font-bold text-primary-600 uppercase tracking-wider md:hidden">HR System</span>
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3 pl-4 border-l border-slate-200">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-bold text-slate-800 leading-none">${displayName}</p>
          <p class="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-tighter">${userRole}</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold border-2 border-white shadow-sm">
          ${displayName.charAt(0).toUpperCase()}
        </div>
        <button onclick="logout()"
          class="ml-2 rounded-xl border border-slate-200 text-slate-600 text-sm px-4 py-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200 font-medium">
          Đăng xuất
        </button>
      </div>
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
  const configs = {
    success: { bg: 'bg-emerald-500', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>' },
    error:   { bg: 'bg-rose-500',    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' },
    warning: { bg: 'bg-amber-500',   icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>' }
  };
  const config = configs[type] || configs.success;

  const div = document.createElement('div');
  div.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-white font-semibold flex items-center gap-3 ${config.bg} fade-in`;
  div.innerHTML = `<span>${config.icon}</span> <span>${message}</span>`;
  document.body.appendChild(div);

  setTimeout(() => {
    div.style.opacity = '0';
    div.style.transform = 'translate(-50%, -20px)';
    div.style.transition = 'all 0.3s ease';
    setTimeout(() => div.remove(), 300);
  }, 3000);
}

function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) {
    el.classList.remove('hidden');
    el.classList.add('flex');
    const inner = el.querySelector('.bg-white');
    if (inner) inner.classList.add('fade-in');
  }
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) {
    el.classList.add('hidden');
    el.classList.remove('flex');
  }
}
