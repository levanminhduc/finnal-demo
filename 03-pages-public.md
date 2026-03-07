# 03. Pages - Public

## 1. index.html
### Mục tiêu
Trang giới thiệu ngắn về hệ thống.

### Thành phần
- tên hệ thống
- mô tả ngắn
- nút Login
- nút Register

### UI notes
- hero đơn giản
- button bo góc nhẹ bằng `rounded-md`

---

## 2. login.html
### Mục tiêu
Đăng nhập vào hệ thống và điều hướng theo role.

### Thành phần
- email input
- password input
- login button
- link register

### Hành động
- kiểm tra user từ localStorage
- nếu role = admin → vào admin/dashboard.html
- nếu role = employee → vào employee/dashboard.html

### UI notes
- form card giữa màn hình
- input và button bo góc nhẹ

---

## 3. register.html
### Mục tiêu
Tạo tài khoản employee mới.

### Thành phần
- full name
- email
- password
- confirm password
- register button

### Hành động
- validate cơ bản
- thêm user mới vào localStorage
- thêm employee profile mặc định

### UI notes
- form card đơn giản
- ưu tiên dễ nhìn, không cần nhiều hiệu ứng
