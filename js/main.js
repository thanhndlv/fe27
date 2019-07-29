/*
  Quan Ly Nhan Vien:
  -- Them Nhan Vien
*/

var mangNhanVien = [];
var validation = new Validation();
var jsonData = localStorage.getItem("DSNV");
if (jsonData) {
  mangNhanVien = JSON.parse(jsonData);
  HienThi(mangNhanVien);
}
else {
  mangNhanVien = []
}

function getEle(id) {
  return document.getElementById(id);
}

function LayThongTin() {
  //lay thong tin
  var maNV = getEle("msnv").value;
  var hoTenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngaySinh = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;
  //tao doi tuong (thong qua lop doi tuong)
  var nhanVien = new NhanVien(maNV, hoTenNV, email, matKhau, ngaySinh, chucVu);
  nhanVien.tinhTongLuong();

  return nhanVien;
}

function themNhanVien() {
  var nhanVien = LayThongTin();
  var isValid = true;
  isValid &= validation.KiemTraRong("msnv", "tbMaNV", "(*) Vui lòng nhập mã");
  isValid &=
    validation.KiemTraRong("name", "tbTen", "(*) Vui lòng nhập tên") &&
    validation.KiemTraDinhDangChu("name", "tbTen", "(*) Vui lòng đúng ký tự");
  isValid &= validation.KiemTraChucVu();

  //them vao mang
  if (isValid) {
    mangNhanVien.push(nhanVien);
    //Hien Thi
    HienThi(mangNhanVien);
  }
}

function HienThi(mangHienThi) {
  var tableDanhSach = getEle("tableDanhSach");
  var content = "";
  for (var i = 0; i < mangHienThi.length; i++) {
    var nhanVien = mangHienThi[i];
    //template string ``
    content += `
      <tr>
        <td>${nhanVien.maNhanVien}</td>
        <td>${nhanVien.tenNhanVien}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngaySinh}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>
          <button
            class="btn btn-danger"
            data-id="${nhanVien.maNhanVien}"
            onclick="XoaNhanVien(event)">Xoá</button>
          <button class="btn btn-info"
            data-toggle="modal"
            data-target="#myModal"
            data-id="${nhanVien.maNhanVien}"
            onclick="HienThiThongTinLenForm(event)"
            >Sửa</button>
        </td>
      </tr>
    `
  }
  tableDanhSach.innerHTML = content;
}

//local storage: chi nhan kieu du lieu la chuoi JSON
function LuuDuLieu() {
  //Chuyen kieu du lieu ve kieu JSON
  var jsonData = JSON.stringify(mangNhanVien);
  //Luu vao localStorage : key value
  localStorage.setItem("DSNV", jsonData);
}

function LayDuLieu() {
  //Lay du lieu tu local Storage
  var jsonData = localStorage.getItem("DSNV");
  //Chuyen kieu du lieu
  mangNhanVien = JSON.parse(jsonData);
  HienThi(mangNhanVien);
}

function TimViTri(id) {
  // Lay tung nhan vien ra bang cach duyet mang
  for (var i = 0; i < mangNhanVien.length; i++) {
    var nhanVien = mangNhanVien[i];
    if (nhanVien.maNhanVien === id) {
      return i;
    }
  }
  return -1;
}

//Xoa Nhan Vien
function XoaNhanVien(event) {
  // Lay id can xoa
  var btnXoa = event.target;
  var idXoa = btnXoa.getAttribute("data-id");

  //Tim vi tri can xoa
  var index = TimViTri(idXoa);

  //Xoa
  mangNhanVien.splice(index, 1);
  HienThi(mangNhanVien);
}

//CapNhat
function HienThiThongTinLenForm(event) {
  var btnSua = event.target;
  var idSua = btnSua.getAttribute("data-id");
  var index = TimViTri(idSua);
  var nhanVien = mangNhanVien[index];

  //Hien Thi
  getEle("msnv").value = nhanVien.maNhanVien;
  getEle("name").value = nhanVien.tenNhanVien;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngaySinh;
  getEle("email").value = nhanVien.email;
  getEle("chucvu").value = nhanVien.chucVu;

  getEle("msnv").setAttribute("readonly", true);
}

function CapNhatThongTin() {
  var nhanVien = LayThongTin();
  //De len doi tuong can sua
  var index = TimViTri(nhanVien.maNhanVien);
  mangNhanVien[index] = nhanVien;
  HienThi(mangNhanVien);
}

function TimNhanVien() {
  var mangNhanVienTimKiem = [];
  var keyword = getEle("searchName").value;
  keyword = keyword
    .toLowerCase() // Chuyen thanh chu thuong
    .replace(/\s/g, ''); // Xoa bo nhung khoang trang

  // JS thuan
  // for (var i = 0; i < mangNhanVien.length; i++) {
  //   if (mangNhanVien[i].tenNhanVien.toLowerCase().replace(/\s/g, '') === keyword) {
  //     mangNhanVienTimKiem.push(mangNhanVien[i]);
  //   }
  // }

  //Js es6
  mangNhanVienTimKiem = mangNhanVien.filter(function (nhanVien) {
    return nhanVien.tenNhanVien.toLowerCase().replace(/\s/g, '').indexOf(keyword) !== -1
  });
  HienThi(mangNhanVienTimKiem);
}

//Goi Ham (thay cho onclick ben html)
getEle("btnThemNV").addEventListener("click", themNhanVien);
getEle("btnLuuDuLieu").addEventListener("click", LuuDuLieu);
getEle("btnLayDuLieu").addEventListener("click", LayDuLieu);
getEle("btnCapNhat").addEventListener("click", CapNhatThongTin);
getEle("btnTimNV").addEventListener("click", TimNhanVien);
getEle("searchName").addEventListener("keyup", function () {
  TimNhanVien();
});
