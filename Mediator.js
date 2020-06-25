function Mediator() {
  this.list = [];
  this.activeSort = 1;
}

Mediator.state = {
  fromAtoZ: 0,
  fromZtoA: 1,
};

Mediator.prototype.addToDoitem = function (item) {
  this.list.push(item);
};

Mediator.prototype.removeItem = function () {
  [...lists].forEach((elem) => {
    elem.remove();
  });
};

Mediator.prototype.deleteToDoItemById = function (id) {
  this.list = this.list.filter((elem) => elem.id !== id);
  this.render();
};

Mediator.prototype.sortList = function (list) {
  if (this.activeSort === Mediator.state.fromAtoZ) {
    list.sort(function (a, b) {
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();

      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
      return 0;
    });
    return list;
  }

  if (this.activeSort === Mediator.state.fromZtoA) {
    list.sort(function (a, b) {
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();

      if (textA < textB) {
        return 1;
      }
      if (textA > textB) {
        return -1;
      }
      return 0;
    });

    return list;
  }
  return list;
};

Mediator.prototype.createFragment = function (arr) {
  const fragment = new DocumentFragment();

  arr.forEach(function (elem) {
    fragment.prepend(ToDoItem.createToDoElem(elem));
  });
  ul.append(fragment);
};

Mediator.prototype.render = function () {
  this.removeItem();
  PaginationList.removePaginationItem();

  let filteredList = this.list;

  if (FilterOne.activeFilter !== Filter.state.ALL) {
    filteredList = this.list.filter(
      (elem) => elem.isActive === FilterOne.activeFilter
    );
  }

  if (filteredList.length >= 0) {
    deleteBtnClass(filterBtns, "filter-link--current");
    addBtnClass(filterBtns[FilterOne.activeFilter], "filter-link--current");
  }

  filteredList = this.sortList(filteredList);

  if (filteredList.length >= 0) {
    deleteBtnClass(sortBtns, "sort-btn-current");
    addBtnClass(sortBtns[MediatorService.activeSort], "sort-btn-current");
  }

  PaginationList.createPaginationPageNumber(filteredList);

  let ToDoListOnPage = PaginationList.getSliseArray(
    PaginationList.activePage,
    filteredList
  );

  if (filteredList.length > PaginationList.pageSize) {
    deleteBtnClass([...paginationItems], "pagination-item--active");
    addBtnClass(
      [...paginationItems][PaginationList.activePage - 1],
      "pagination-item--active"
    );
    PaginationList.activePage = 1;
  }

  this.createFragment(ToDoListOnPage);

  localStorage.setItem("TODOList", JSON.stringify(this.list));
  localStorage.setItem("activeFilter", FilterOne.activeFilter);
  localStorage.setItem("activeSort", this.activeSort);
  localStorage.setItem("activePage", PaginationList.activePage);
};

var MediatorService = new Mediator();
