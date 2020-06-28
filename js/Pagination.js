function Pagination() {
  this.activePage = JSON.parse(localStorage.getItem("activePage")) || 1;
  this.pageSize = 5;
}

Pagination.prototype.removePaginationItem = function () {
  [...toDoVariables.paginationItems].forEach((elem) => {
    elem.remove();
  });
};

Pagination.prototype.createElement = function (elem) {
  const li = document.createElement("li");
  li.className = "pagination-item";
  li.textContent = elem + 1;

  li.addEventListener("click", function () {
    PaginationList.activePage = elem + 1;

    AppControllerServises.render();
  });
  return li;
};

Pagination.prototype.createFragment = function (arr) {
  if (arr.length <= this.pageSize) {
    return;
  }

  const fragment = new DocumentFragment();
  const countOfItems = Math.ceil(arr.length / this.pageSize);
  const pageButtons = [...Array(countOfItems).keys()];

  pageButtons.forEach((elem) => {
    fragment.append(this.createElement(elem));
  });
  return fragment;
};

Pagination.prototype.createPaginationPageNumber = function (arr) {
  toDoVariables.pagination.append(this.createFragment(arr));
};

Pagination.prototype.getSliceArray = function (arr) {
  const start = (this.activePage - 1) * this.pageSize;
  const end = start + this.pageSize;
  let newArr = arr.slice(start, end);

  return newArr;
};

var PaginationList = new Pagination();
