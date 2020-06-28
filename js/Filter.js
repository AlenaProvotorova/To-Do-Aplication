function Filter() {
  this.activeFilter = +localStorage.getItem("activeFilter") || 0;
}

Filter.state = {
  ALL: 0,
  INACTIVE: 2,
  ACTIVE: 1,
};

Filter.deleteBtnClass = function (arr, cl) {
  arr.forEach((elem) => {
    elem.classList.remove(cl);
  });
};

Filter.addBtnClass = function (elem, cl) {
  elem.classList.add(cl);
};

var FilterOne = new Filter();
