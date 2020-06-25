function Pagination() {
  this.activePage = 1;
  this.pageSize = 5;
}

Pagination.prototype.removePaginationItem = function () {
  [...paginationItems].forEach((elem) => {
    elem.remove();
  });
};

Pagination.prototype.createPaginationPageNumber = function (arr) {
  if (arr.length <= this.pageSize) {
    return;
  }

  const countOfItems = Math.ceil(arr.length / this.pageSize);
  const pageButtons = [...Array(countOfItems).keys()];

  pageButtons.forEach((elem) => {
    const li = document.createElement("li");
    li.className = "pagination-item";
    li.textContent = elem + 1;

    li.addEventListener("click", function () {
      PaginationList.activePage = elem + 1;

      MediatorService.render();
    });

    pagination.append(li);
  });
};

Pagination.prototype.getSliseArray = function (text, arr) {
  const start = (text - 1) * this.pageSize;
  const end = start + this.pageSize;
  let newArr = arr.slice(start, end);

  return newArr;
};

var PaginationList = new Pagination();
