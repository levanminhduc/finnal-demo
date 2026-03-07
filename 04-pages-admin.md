# 04. Pages - Admin

## Layout chung cho toàn bộ trang Admin
- header ở trên
- nội dung ở trái
- **sidebar bên phải**
- sidebar chứa menu module admin
- dùng TailwindCSS
- table, card, form bo góc nhẹ với `rounded-md`

---

## 1. dashboard.html
### Mục tiêu
Hiển thị tổng quan hệ thống.

### Thành phần
- card tổng số nhân viên
- card đơn nghỉ chờ duyệt
- card ticket hỗ trợ
- card vị trí tuyển dụng
- danh sách thông báo gần đây

---

## 2. employees.html
### Mục tiêu
Quản lý hồ sơ nhân viên.

### Tính năng basic
- xem danh sách
- thêm nhân viên
- sửa nhân viên
- xóa nhân viên
- tìm kiếm cơ bản

### Dữ liệu
- `employees`
- `users`

---

## 3. attendance.html
### Mục tiêu
Quản lý chấm công.

### Tính năng basic
- xem danh sách chấm công
- lọc theo tháng
- lọc theo nhân viên
- sửa trạng thái

### Dữ liệu
- `attendance`
- `employees`

---

## 4. salary.html
### Mục tiêu
Quản lý lương thưởng.

### Tính năng basic
- xem danh sách lương
- thêm phiếu lương
- sửa phiếu lương
- tính tổng lương

### Công thức demo
`total = base + bonus - deduction`

---

## 5. evaluations.html
### Mục tiêu
Quản lý đánh giá hiệu suất.

### Tính năng basic
- tạo phiếu đánh giá
- nhập điểm
- nhập nhận xét
- xem danh sách

---

## 6. leaves.html
### Mục tiêu
Quản lý nghỉ phép.

### Tính năng basic
- xem danh sách đơn
- lọc trạng thái
- approve
- reject

---

## 7. trainings.html
### Mục tiêu
Quản lý khóa đào tạo.

### Tính năng basic
- thêm khóa học
- sửa khóa học
- xóa khóa học
- xem người đăng ký

---

## 8. benefits.html
### Mục tiêu
Quản lý phúc lợi.

### Tính năng basic
- thêm quyền lợi
- sửa quyền lợi
- xóa quyền lợi
- xem danh sách

---

## 9. contracts.html
### Mục tiêu
Quản lý hợp đồng.

### Tính năng basic
- thêm hợp đồng
- sửa hợp đồng
- xóa hợp đồng
- xem trạng thái hợp đồng

---

## 10. notifications.html
### Mục tiêu
Quản lý thông báo.

### Tính năng basic
- tạo thông báo
- sửa thông báo
- xóa thông báo
- xem danh sách thông báo

---

## 11. supports.html
### Mục tiêu
Xử lý yêu cầu hỗ trợ.

### Tính năng basic
- xem ticket
- cập nhật trạng thái
- phản hồi ngắn

---

## 12. security.html
### Mục tiêu
Quản lý bảo mật cơ bản.

### Tính năng basic
- xem tài khoản
- khóa/mở tài khoản
- đổi mật khẩu admin

---

## 13. reports.html
### Mục tiêu
Xem báo cáo tổng hợp.

### Tính năng basic
- card thống kê
- bảng tổng hợp nhân viên
- bảng tổng hợp nghỉ phép và lương

---

## 14. settings.html
### Mục tiêu
Cấu hình hệ thống.

### Tính năng basic
- tên công ty
- số ngày công chuẩn
- phụ cấp mặc định

---

## 15. recruitment.html
### Mục tiêu
Quản lý tuyển dụng nội bộ.

### Tính năng basic
- tạo vị trí tuyển dụng
- sửa vị trí
- xóa vị trí
- xem danh sách ứng viên nội bộ

---

## 16. promotions.html
### Mục tiêu
Quản lý thăng tiến.

### Tính năng basic
- tạo lộ trình thăng tiến
- xem đề xuất
- cập nhật trạng thái
