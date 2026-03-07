// ===== CRUD HELPERS =====
function getAll(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function saveAll(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function addRecord(key, record) {
  const data = getAll(key);
  const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
  data.push({ id: newId, ...record });
  saveAll(key, data);
  return newId;
}
function updateRecord(key, id, updated) {
  const data = getAll(key).map(d => d.id === id ? { ...d, ...updated } : d);
  saveAll(key, data);
}
function deleteRecord(key, id) {
  const data = getAll(key).filter(d => d.id !== id);
  saveAll(key, data);
}

// ===== SEED DATA =====
function seedData() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { id: 1, email: "admin@gmail.com", password: "123456", role: "admin", status: "active" },
      { id: 2, email: "nva@gmail.com", password: "123456", role: "employee", status: "active" },
      { id: 3, email: "ttb@gmail.com", password: "123456", role: "employee", status: "active" },
      { id: 4, email: "lvc@gmail.com", password: "123456", role: "employee", status: "active" },
      { id: 5, email: "ptd@gmail.com", password: "123456", role: "employee", status: "active" },
      { id: 6, email: "nte@gmail.com", password: "123456", role: "employee", status: "active" },
      { id: 7, email: "hvf@gmail.com", password: "123456", role: "employee", status: "active" },
      { id: 8, email: "dtg@gmail.com", password: "123456", role: "employee", status: "inactive" }
    ]));
  }

  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify([
      { id: 1, userId: 2, name: "Nguyễn Văn An", gender: "Nam", dob: "1998-05-12", phone: "0901234567", address: "Quận 1, TP.HCM", department: "IT", position: "Frontend Developer", joinDate: "2025-06-01" },
      { id: 2, userId: 3, name: "Trần Thị Bình", gender: "Nữ", dob: "1999-08-22", phone: "0912345678", address: "Quận 3, TP.HCM", department: "HR", position: "HR Specialist", joinDate: "2025-07-15" },
      { id: 3, userId: 4, name: "Lê Văn Cường", gender: "Nam", dob: "1997-03-10", phone: "0923456789", address: "Quận 7, TP.HCM", department: "IT", position: "Backend Developer", joinDate: "2025-04-01" },
      { id: 4, userId: 5, name: "Phạm Thị Dung", gender: "Nữ", dob: "2000-11-30", phone: "0934567890", address: "Quận Bình Thạnh, TP.HCM", department: "Kế toán", position: "Kế toán viên", joinDate: "2025-09-01" },
      { id: 5, userId: 6, name: "Ngô Thanh Em", gender: "Nữ", dob: "1996-01-15", phone: "0945678901", address: "Quận 2, TP.HCM", department: "Marketing", position: "Marketing Executive", joinDate: "2025-03-15" },
      { id: 6, userId: 7, name: "Hoàng Văn Phúc", gender: "Nam", dob: "1995-07-20", phone: "0956789012", address: "Quận Tân Bình, TP.HCM", department: "IT", position: "Team Lead", joinDate: "2024-01-10" },
      { id: 7, userId: 8, name: "Đặng Thị Giang", gender: "Nữ", dob: "2001-04-05", phone: "0967890123", address: "Quận 9, TP.HCM", department: "HR", position: "HR Intern", joinDate: "2026-01-15" }
    ]));
  }

  if (!localStorage.getItem('attendance')) {
    const records = [];
    const dates = ['2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04'];
    const statusMap = [
      ['Present','Present','Late','Present'],
      ['Present','Absent','Present','Present'],
      ['Late','Present','Present','Absent'],
      ['Present','Present','Present','Late'],
      ['Absent','Present','Late','Present'],
      ['Present','Present','Present','Present'],
      ['Present','Late','Present','Absent']
    ];
    const checkIns  = ['08:05','08:00','08:15','08:00'];
    const checkOuts = ['17:10','17:00','17:20','17:05'];
    let id = 1;
    for (let e = 0; e < 7; e++) {
      for (let d = 0; d < 4; d++) {
        const status = statusMap[e][d];
        records.push({
          id: id++,
          employeeId: e + 1,
          date: dates[d],
          checkIn: status === 'Absent' ? null : checkIns[d],
          checkOut: status === 'Absent' ? null : checkOuts[d],
          status
        });
      }
    }
    localStorage.setItem('attendance', JSON.stringify(records));
  }

  if (!localStorage.getItem('salaries')) {
    const bases   = [12000000, 10000000, 15000000, 9000000, 11000000, 20000000, 8000000];
    const bonuses = [1000000, 500000, 2000000, 0, 800000, 1500000, 0];
    const deds    = [300000, 200000, 500000, 200000, 300000, 400000, 200000];
    const months  = ['2026-02', '2026-03'];
    const records = [];
    let id = 1;
    for (const month of months) {
      for (let e = 0; e < 7; e++) {
        const base = bases[e], bonus = bonuses[e], deduction = deds[e];
        records.push({
          id: id++,
          employeeId: e + 1,
          month,
          base,
          bonus,
          deduction,
          total: base + bonus - deduction,
          status: month === '2026-02' ? 'Paid' : (e % 2 === 0 ? 'Paid' : 'Pending')
        });
      }
    }
    localStorage.setItem('salaries', JSON.stringify(records));
  }

  if (!localStorage.getItem('evaluations')) {
    localStorage.setItem('evaluations', JSON.stringify([
      { id: 1, employeeId: 1, period: "Q1-2026", score: 8.5, comment: "Hoàn thành tốt các nhiệm vụ được giao, cần cải thiện kỹ năng giao tiếp.", evaluatedBy: 1 },
      { id: 2, employeeId: 2, period: "Q1-2026", score: 9.0, comment: "Xuất sắc trong công tác nhân sự, là điểm tựa của phòng HR.", evaluatedBy: 1 },
      { id: 3, employeeId: 3, period: "Q1-2026", score: 7.5, comment: "Chất lượng code tốt, cần nâng cao tốc độ xử lý công việc.", evaluatedBy: 1 },
      { id: 4, employeeId: 4, period: "Q1-2026", score: 8.0, comment: "Kế toán cẩn thận, báo cáo chính xác và đúng hạn.", evaluatedBy: 1 },
      { id: 5, employeeId: 5, period: "Q1-2026", score: 6.5, comment: "Cần chủ động hơn trong công việc marketing và đề xuất ý tưởng.", evaluatedBy: 1 },
      { id: 6, employeeId: 6, period: "Q1-2026", score: 9.0, comment: "Lãnh đạo team xuất sắc, đóng góp lớn vào thành công dự án.", evaluatedBy: 1 },
      { id: 7, employeeId: 7, period: "Q1-2026", score: 7.0, comment: "Thực tập sinh tiềm năng, đang học hỏi tốt và cần thêm thời gian.", evaluatedBy: 1 }
    ]));
  }

  if (!localStorage.getItem('leaves')) {
    localStorage.setItem('leaves', JSON.stringify([
      { id: 1, employeeId: 1, type: "Nghỉ phép năm", from: "2026-03-10", to: "2026-03-12", days: 3, reason: "Việc gia đình cần giải quyết", status: "Approved", approvedBy: 1 },
      { id: 2, employeeId: 2, type: "Nghỉ bệnh", from: "2026-03-05", to: "2026-03-05", days: 1, reason: "Bị ốm cần nghỉ dưỡng", status: "Approved", approvedBy: 1 },
      { id: 3, employeeId: 3, type: "Nghỉ phép năm", from: "2026-04-01", to: "2026-04-03", days: 3, reason: "Du lịch cùng gia đình", status: "Pending", approvedBy: null },
      { id: 4, employeeId: 4, type: "Nghỉ cưới", from: "2026-03-20", to: "2026-03-22", days: 3, reason: "Tổ chức đám cưới", status: "Pending", approvedBy: null },
      { id: 5, employeeId: 5, type: "Nghỉ phép năm", from: "2026-02-20", to: "2026-02-21", days: 2, reason: "Việc cá nhân", status: "Rejected", approvedBy: 1 }
    ]));
  }

  if (!localStorage.getItem('trainings')) {
    localStorage.setItem('trainings', JSON.stringify([
      { id: 1, title: "Đào tạo kỹ năng lãnh đạo", date: "2026-03-15", duration: "2 ngày", instructor: "Nguyễn Minh Tuấn", attendees: [1, 3, 6], status: "Upcoming", description: "Khóa đào tạo nâng cao kỹ năng quản lý và lãnh đạo cho team lead" },
      { id: 2, title: "Kỹ năng giao tiếp trong môi trường doanh nghiệp", date: "2026-02-20", duration: "1 ngày", instructor: "Trần Lan Anh", attendees: [1, 2, 4, 5, 7], status: "Completed", description: "Phát triển kỹ năng giao tiếp hiệu quả trong công việc" },
      { id: 3, title: "Cập nhật quy trình kế toán 2026", date: "2026-03-08", duration: "4 giờ", instructor: "Lê Thành Công", attendees: [4], status: "Upcoming", description: "Cập nhật các quy định kế toán mới nhất áp dụng từ 2026" }
    ]));
  }

  if (!localStorage.getItem('benefits')) {
    localStorage.setItem('benefits', JSON.stringify([
      { id: 1, name: "Hỗ trợ ăn trưa", amount: 1000000, description: "Hỗ trợ 1.000.000đ/tháng cho chi phí ăn trưa tại văn phòng", eligibility: "Tất cả nhân viên chính thức", status: "Active" },
      { id: 2, name: "Bảo hiểm sức khỏe", amount: 2000000, description: "Bảo hiểm sức khỏe toàn diện cho nhân viên và gia đình", eligibility: "Nhân viên thử việc trở lên", status: "Active" },
      { id: 3, name: "Hỗ trợ gym", amount: 500000, description: "Hỗ trợ 500.000đ/tháng cho gói tập thể dục tại gym", eligibility: "Nhân viên chính thức", status: "Active" },
      { id: 4, name: "Du lịch hàng năm", amount: 5000000, description: "Nghỉ dưỡng và du lịch hàng năm 5.000.000đ/người", eligibility: "Nhân viên làm việc trên 1 năm", status: "Active" }
    ]));
  }

  if (!localStorage.getItem('contracts')) {
    localStorage.setItem('contracts', JSON.stringify([
      { id: 1, employeeId: 1, type: "Official", startDate: "2025-06-01", endDate: "2027-06-01", salary: 12000000, status: "Active", signedDate: "2025-05-25" },
      { id: 2, employeeId: 2, type: "Official", startDate: "2025-07-15", endDate: "2027-07-15", salary: 10000000, status: "Active", signedDate: "2025-07-10" },
      { id: 3, employeeId: 3, type: "Official", startDate: "2025-04-01", endDate: "2027-04-01", salary: 15000000, status: "Active", signedDate: "2025-03-25" },
      { id: 4, employeeId: 4, type: "Probation", startDate: "2025-09-01", endDate: "2025-11-01", salary: 8000000, status: "Expired", signedDate: "2025-08-28" },
      { id: 5, employeeId: 5, type: "Official", startDate: "2025-03-15", endDate: "2027-03-15", salary: 11000000, status: "Active", signedDate: "2025-03-10" },
      { id: 6, employeeId: 6, type: "Official", startDate: "2024-01-10", endDate: "2026-01-10", salary: 20000000, status: "Expired", signedDate: "2024-01-05" },
      { id: 7, employeeId: 7, type: "Internship", startDate: "2026-01-15", endDate: "2026-07-15", salary: 8000000, status: "Active", signedDate: "2026-01-12" }
    ]));
  }

  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify([
      { id: 1, title: "Thông báo nghỉ lễ 30/4 - 1/5", content: "Công ty thông báo lịch nghỉ lễ Giỗ Tổ Hùng Vương, 30/4 và 1/5/2026 như sau: nghỉ từ 28/4 đến 03/5/2026.", date: "2026-03-01", type: "holiday", isRead: false },
      { id: 2, title: "Họp toàn thể tháng 3", content: "Kính mời toàn thể CBNV tham dự cuộc họp tổng kết tháng 3 vào lúc 14:00 ngày 28/03/2026 tại phòng họp lớn.", date: "2026-03-05", type: "meeting", isRead: false },
      { id: 3, title: "Cập nhật chính sách lương thưởng 2026", content: "Ban lãnh đạo thông báo điều chỉnh chính sách lương thưởng áp dụng từ quý 2/2026. Chi tiết xem tại phòng HR.", date: "2026-03-02", type: "policy", isRead: true },
      { id: 4, title: "Đánh giá hiệu suất Q1-2026", content: "Kết quả đánh giá hiệu suất quý 1/2026 đã được công bố. Mời các nhân viên xem chi tiết trong hệ thống.", date: "2026-03-06", type: "evaluation", isRead: false },
      { id: 5, title: "Chào mừng nhân viên mới", content: "Công ty trân trọng giới thiệu thành viên mới: Đặng Thị Giang, vị trí HR Intern. Kính mời mọi người chào đón!", date: "2026-01-15", type: "welcome", isRead: true }
    ]));
  }

  if (!localStorage.getItem('supports')) {
    localStorage.setItem('supports', JSON.stringify([
      { id: 1, employeeId: 1, subject: "Yêu cầu cấp lại thẻ nhân viên", content: "Thẻ nhân viên của tôi bị mất, đề nghị hỗ trợ cấp lại thẻ mới sớm nhất.", date: "2026-03-04", status: "Resolved", response: "Đã gửi yêu cầu lên bộ phận hành chính, thẻ mới sẽ được cấp trong 3 ngày làm việc." },
      { id: 2, employeeId: 3, subject: "Lỗi phần mềm không truy cập được", content: "Không đăng nhập được vào hệ thống nội bộ từ sáng nay, ảnh hưởng đến công việc.", date: "2026-03-06", status: "Pending", response: null },
      { id: 3, employeeId: 5, subject: "Thắc mắc về chính sách nghỉ phép", content: "Tôi muốn hỏi về quy định số ngày nghỉ phép năm còn lại và cách tính ngày nghỉ.", date: "2026-03-07", status: "Pending", response: null }
    ]));
  }

  if (!localStorage.getItem('settings')) {
    localStorage.setItem('settings', JSON.stringify({
      companyName: "Công ty TNHH ABC",
      standardWorkDays: 26,
      defaultAllowance: 500000
    }));
  }

  if (!localStorage.getItem('recruitments')) {
    localStorage.setItem('recruitments', JSON.stringify([
      { id: 1, title: "Tuyển dụng Senior React Developer", department: "IT", positions: 2, deadline: "2026-03-31", requirements: "Tối thiểu 3 năm kinh nghiệm React, TypeScript, biết REST API.", status: "Open", postedDate: "2026-03-01" },
      { id: 2, title: "Tuyển dụng Kế toán tổng hợp", department: "Kế toán", positions: 1, deadline: "2026-02-28", requirements: "Có bằng kế toán, tối thiểu 2 năm kinh nghiệm, thành thạo Excel.", status: "Closed", postedDate: "2026-01-15" }
    ]));
  }

  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify([
      { id: 1, recruitmentId: 1, name: "Võ Minh Hùng", email: "vmhung@gmail.com", phone: "0988776655", appliedDate: "2026-03-05", cv: "cv_vmhung.pdf", status: "Pending", note: "" },
      { id: 2, recruitmentId: 2, name: "Bùi Thị Kim Anh", email: "btka@gmail.com", phone: "0977665544", appliedDate: "2026-02-10", cv: "cv_btka.pdf", status: "Accepted", note: "Ứng viên xuất sắc, đã mời phỏng vấn vòng 2." }
    ]));
  }

  if (!localStorage.getItem('promotions')) {
    localStorage.setItem('promotions', JSON.stringify([
      { id: 1, employeeId: 3, currentPosition: "Backend Developer", proposedPosition: "Senior Backend Developer", reason: "Có đóng góp vượt trội trong 2 quý liên tiếp, kỹ năng kỹ thuật xuất sắc.", proposedDate: "2026-03-01", status: "In Review", reviewedBy: null },
      { id: 2, employeeId: 6, currentPosition: "Team Lead", proposedPosition: "Engineering Manager", reason: "Lãnh đạo đội ngũ hiệu quả, hoàn thành dự án đúng tiến độ và ngân sách.", proposedDate: "2026-02-15", status: "Approved", reviewedBy: 1 }
    ]));
  }
}

// Run seed on load
seedData();
