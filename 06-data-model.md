# 06. Data Model

## 1. Nguyên tắc
- dữ liệu mô phỏng
- lưu bằng localStorage
- không cần database thật
- có thể seed dữ liệu trong `data.js`

## 2. Danh sách collections
- users
- employees
- attendance
- salaries
- evaluations
- leaves
- trainings
- benefits
- contracts
- notifications
- supports
- settings
- recruitments
- applications
- promotions

---

## 3. Mẫu dữ liệu

### users
```js
{
  id: 1,
  email: "admin@gmail.com",
  password: "123456",
  role: "admin",
  status: "active"
}
```

### employees
```js
{
  id: 1,
  userId: 2,
  name: "Nguyen Van A",
  gender: "Male",
  dob: "2002-01-01",
  phone: "0123456789",
  address: "HCM",
  department: "IT",
  position: "Frontend Intern",
  joinDate: "2026-01-15"
}
```

### attendance
```js
{
  id: 1,
  employeeId: 1,
  date: "2026-03-01",
  checkIn: "08:00",
  checkOut: "17:00",
  status: "Present"
}
```

### salaries
```js
{
  id: 1,
  employeeId: 1,
  month: "2026-03",
  base: 8000000,
  bonus: 500000,
  deduction: 200000,
  total: 8300000,
  status: "Paid"
}
```

### evaluations
```js
{
  id: 1,
  employeeId: 1,
  period: "Q1-2026",
  score: 8.5,
  comment: "Good performance"
}
```

### leaves
```js
{
  id: 1,
  employeeId: 1,
  fromDate: "2026-03-10",
  toDate: "2026-03-11",
  reason: "Personal",
  status: "Pending"
}
```

### trainings
```js
{
  id: 1,
  title: "Frontend Basics",
  description: "Basic internal training",
  date: "2026-03-20",
  attendees: [1]
}
```

### benefits
```js
{
  id: 1,
  title: "Lunch Allowance",
  description: "Monthly lunch support"
}
```

### contracts
```js
{
  id: 1,
  employeeId: 1,
  type: "Internship",
  startDate: "2026-01-15",
  endDate: "2026-06-15",
  status: "Active"
}
```

### notifications
```js
{
  id: 1,
  title: "Holiday Notice",
  content: "Company holiday on Friday",
  date: "2026-03-05"
}
```

### supports
```js
{
  id: 1,
  employeeId: 1,
  subject: "Account issue",
  message: "Cannot update profile",
  status: "Pending",
  response: ""
}
```

### settings
```js
{
  companyName: "ABC Company",
  standardWorkDays: 26,
  defaultAllowance: 500000
}
```

### recruitments
```js
{
  id: 1,
  title: "Junior Frontend Developer",
  department: "IT",
  description: "Internal opening",
  status: "Open"
}
```

### applications
```js
{
  id: 1,
  recruitmentId: 1,
  employeeId: 1,
  status: "Pending"
}
```

### promotions
```js
{
  id: 1,
  employeeId: 1,
  currentPosition: "Intern",
  nextPosition: "Junior Developer",
  status: "In Review"
}
```

---

## 4. Quan hệ dữ liệu
- users 1-1 employees với user employee
- employees 1-n attendance
- employees 1-n salaries
- employees 1-n evaluations
- employees 1-n leaves
- employees 1-n contracts
- employees 1-n supports
- employees 1-n applications
- employees 1-n promotions
- recruitments 1-n applications
