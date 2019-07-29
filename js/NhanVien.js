//Tao lop doi tuong Nhan Vien
function NhanVien(maNV, tenNV, email, matKhau, ngaySinh, chucVu) {
  this.maNhanVien = maNV;
  this.tenNhanVien = tenNV;
  this.email = email;
  this.matKhau = matKhau;
  this.ngaySinh = ngaySinh;
  this.chucVu = chucVu;
  this.LuongCB = 400;
  this.tongLuong = 0;
  //tổng lương = hệ số lương * lương cơ bản
  //Sep : 3
  //Truong phong: 1.5
  //Nhan Vien: 1
  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = this.LuongCB * 3;
    }
    else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.LuongCB * 1.5
    }
    else if (this.chucVu === "Nhân viên") {
      this.tongLuong = this.LuongCB;
    }
  }
}