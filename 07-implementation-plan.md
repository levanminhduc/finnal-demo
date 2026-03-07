# 07. Implementation Plan

## Nguyên tắc triển khai
- làm theo phase
- không làm toàn bộ project trong một lần
- ưu tiên module lõi trước
- tất cả đều là front-end only demo

---

## Phase 1 — Setup Project
### Mục tiêu
- tạo cấu trúc thư mục
- tạo file HTML cơ bản
- thêm TailwindCSS CDN
- tạo `data.js`, `auth.js`, `admin.js`, `employee.js`
- seed dữ liệu mẫu vào localStorage

### Kết quả cần có
- project chạy được
- có dữ liệu mẫu
- đã có layout base

---

## Phase 2 — Auth + Shared Layout
### Mục tiêu
- login
- register
- logout
- role check
- right sidebar cho admin và employee

### UI rules
- sidebar bên phải
- button bo góc nhẹ
- input bo góc nhẹ
- table/card dùng `rounded-md`

---

## Phase 3 — Core Modules
### Mục tiêu
Hoàn thành 4 module quan trọng nhất:
- employees
- attendance
- salary
- leaves

### Vì sao làm trước
Đây là các phần dễ demo nhất và thể hiện rõ nhất hệ thống HRM.

---

## Phase 4 — Secondary Modules
### Modules
- evaluations
- trainings
- benefits
- contracts
- notifications
- supports
- reports
- settings
- recruitment
- promotions
- security
- account

### Mức độ hoàn thành
Mỗi module chỉ cần mức basic:
- hiển thị
- thêm/sửa nếu cần
- đổi trạng thái nếu cần

---

## Phase 5 — Polish
### Mục tiêu
- rà soát UI
- validate form cơ bản
- kiểm tra localStorage
- test role Admin / Employee
- sửa bug logic cơ bản

---

## Gợi ý thứ tự file nên code
1. `index.html`
2. `login.html`
3. `register.html`
4. `js/data.js`
5. `js/auth.js`
6. `admin/dashboard.html`
7. `employee/dashboard.html`
8. `admin/employees.html`
9. `employee/profile.html`
10. `admin/attendance.html`
11. `employee/attendance.html`
12. `admin/salary.html`
13. `employee/salary.html`
14. `admin/leaves.html`
15. `employee/leaves.html`
16. các module còn lại
