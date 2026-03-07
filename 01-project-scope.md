# 01. Project Scope

## 1. Tên dự án
HR Management System

## 2. Mục tiêu
Xây dựng hệ thống quản lý nhân sự theo đúng tinh thần đề bài, gồm 2 khu vực:
- **Admin**
- **Employee**

Dự án chỉ triển khai ở mức **cơ bản nhưng đủ module**, phục vụ mục tiêu:
- dễ code
- dễ demo
- dễ kiểm tra tiến độ
- dễ chia việc cho AI hoặc người làm

## 3. Tech Stack
- HTML
- TailwindCSS
- JavaScript thuần
- localStorage

## 4. Scope kỹ thuật
### Có
- giao diện đầy đủ theo module
- nút bấm và form có xử lý
- CRUD mô phỏng ở phía client
- phân vai trò Admin / Employee ở mức front-end
- dữ liệu mock bằng localStorage

### Không có
- backend
- database thật
- REST API
- xác thực bảo mật thật
- upload file thật
- email thật
- realtime
- phân quyền server-side

## 5. Quy chuẩn UI
- dùng **TailwindCSS** cho toàn bộ giao diện
- **sidebar đặt bên phải**
- layout gồm: header + main content + right sidebar
- input / button / select / textarea dùng bo góc nhẹ
- gợi ý class:
  - `rounded-md`
  - `border border-slate-300`
  - `px-3 py-2`
  - `focus:outline-none focus:ring-2 focus:ring-slate-400`

## 6. Định nghĩa mức basic
Mỗi module chỉ cần:
- có trang riêng
- có dữ liệu hiển thị
- có thao tác cơ bản
- có trạng thái đơn giản
- có dữ liệu mô phỏng lưu localStorage

## 7. Kết quả mong muốn
Sau khi hoàn thành, dự án có thể:
- login theo role
- vào đúng khu vực Admin / Employee
- thao tác các module chính ở mức demo
- lưu dữ liệu cục bộ trên trình duyệt
