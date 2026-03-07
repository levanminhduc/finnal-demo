# 02. Sitemap

## 1. Cấu trúc tổng thể
```text
/
├── index.html
├── login.html
├── register.html
├── admin/
│   ├── dashboard.html
│   ├── employees.html
│   ├── attendance.html
│   ├── salary.html
│   ├── evaluations.html
│   ├── leaves.html
│   ├── trainings.html
│   ├── benefits.html
│   ├── contracts.html
│   ├── notifications.html
│   ├── supports.html
│   ├── security.html
│   ├── reports.html
│   ├── settings.html
│   ├── recruitment.html
│   └── promotions.html
└── employee/
    ├── dashboard.html
    ├── profile.html
    ├── attendance.html
    ├── salary.html
    ├── evaluations.html
    ├── leaves.html
    ├── trainings.html
    ├── benefits.html
    ├── contracts.html
    ├── notifications.html
    ├── supports.html
    ├── reports.html
    ├── account.html
    ├── recruitment.html
    └── promotions.html
```

## 2. Luồng truy cập
```text
Index
→ Login / Register
→ Kiểm tra role
   → Admin Dashboard
   → Employee Dashboard
```

## 3. Quy tắc layout
- public pages không cần sidebar
- admin pages dùng right sidebar riêng cho admin
- employee pages dùng right sidebar riêng cho employee
