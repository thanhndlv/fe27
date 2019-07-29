function Validation() {
  //Kiem Tra Rong
  this.KiemTraRong = function (idInput, idThongBao, noiDungTB) {
    var value = getEle(idInput).value;
    var isValid = true;
    if (value === "") {
      isValid = false;
      getEle(idThongBao).style.display = "block";
      getEle(idThongBao).innerHTML = noiDungTB;
    }
    else {
      getEle(idThongBao).innerHTML = "";
    }
    return isValid;
  }

  //KiemTraDinhDangChu
  this.KiemTraDinhDangChu = function (idInput, idThongBao, noiDungTB) {
    var value = getEle(idInput).value;
    var isValid = true;
    var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
    if (!pattern.test(value)) {
      isValid = false;
      getEle(idThongBao).style.display = "block";
      getEle(idThongBao).innerHTML = noiDungTB;
    }
    else {
      getEle(idThongBao).innerHTML = "";
    }
    return isValid;
  }

  //KiemTraDoDai
  this.KiemTraDoDai = function (idInput, idThongBao, noiDungTB, min, max) {
    var value = getEle(idInput).value;
    var isValid = true;
    if (value.length < min || value.length > max) {
      isValid = false;
      getEle(idThongBao).style.display = "block";
      getEle(idThongBao).innerHTML = noiDungTB;
    }
    else {
      getEle(idThongBao).innerHTML = "";
    }
    return isValid;
  }

  //KiemTraChucVu
  this.KiemTraChucVu = function () {
    var chucVuElm = getEle("chucvu");
    var isValid = true;
    if (chucVuElm.selectedIndex === 0) {
      isValid = false;
      getEle("tbChucVu").style.display = "block";
      getEle("tbChucVu").innerHTML = "(*) Vui lòng chọn chức vụ";
    }
    else {
      getEle("tbChucVu").innerHTML = "";
    }
    return isValid;
  }
}