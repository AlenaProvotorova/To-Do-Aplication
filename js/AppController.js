function App() {
  this.list = JSON.parse(localStorage.getItem("TODOList")) || [];
  this.activeSort = +localStorage.getItem("activeSort") || 0;
}

function deleteBtnClass(arr, cl) {
  arr.forEach((elem) => {
    elem.classList.remove(cl);
  });
}

function addBtnClass(elem, cl) {
  elem.classList.add(cl);
}

App.state = {
  fromAtoZ: 0,
  fromZtoA: 1,
};

App.prototype.addAction = function (elem, action) {
  elem.addEventListener(action, (e) => {
    e.preventDefault = "";

    if (e.keyCode === 13 || !e.keyCode) {
      if (toDoVariables.input.value == "") {
        return false;
      } else {
        const todoItem = new ToDoItem(toDoVariables.input.value);
        AppController.addToDoitem(todoItem);

        AppController.render();

        toDoVariables.input.value = "";
      }
    }
  });
};

App.prototype.init = function () {
  AppController.addAction(toDoVariables.btnPlus, "click");
  AppController.addAction(toDoVariables.input, "keydown");

  toDoVariables.btnAll.addEventListener("click", () => {
    FilterOne.activeFilter = Filter.state.ALL;
    AppController.render();
  });

  toDoVariables.btnActive.addEventListener("click", () => {
    FilterOne.activeFilter = Filter.state.ACTIVE;

    AppController.render();
  });

  toDoVariables.btnCompleted.addEventListener("click", () => {
    FilterOne.activeFilter = Filter.state.INACTIVE;
    AppController.render();
  });

  toDoVariables.btnAlphaDown.addEventListener("click", () => {
    AppController.activeSort = App.state.fromZtoA;
    AppController.render();
  });

  toDoVariables.btnAlphaDownAlt.addEventListener("click", () => {
    AppController.activeSort = App.state.fromAtoZ;
    AppController.render();
  });
};

App.prototype.addToDoitem = function (item) {
  this.list.push(item);
};

App.prototype.removeItem = function () {
  [...toDoVariables.lists].forEach((elem) => {
    elem.remove();
  });
};

App.prototype.deleteToDoItemById = function (id) {
  this.list = this.list.filter((elem) => elem.id !== id);
  this.render();
};

App.prototype.checkSortList = function (list) {
  let num1 = -1;
  let num2 = 1;

  if (this.activeSort === App.state.fromZtoA) {
    num1 = 1;
    num2 = -1;
  }

  list.sort(function (a, b) {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();

    if (textA < textB) {
      return num1;
    }
    if (textA > textB) {
      return num2;
    }
    return 0;
  });

  return list;
};

App.prototype.sortList = function (list) {
  const sortList = this.checkSortList(list);
  return sortList;
};

App.prototype.createFragment = function (arr) {
  const fragment = new DocumentFragment();

  arr.forEach(function (elem) {
    fragment.prepend(ToDoItem.createToDoElem(elem));
  });
  return fragment;
};

App.prototype.checkBtnStyle = function (list, elems, elem, cl) {
  if (list.length >= 0) {
    Filter.deleteBtnClass(elems, cl);
    Filter.addBtnClass(elem, cl);
  }
};

App.prototype.render = function () {
  this.removeItem();
  PaginationList.removePaginationItem();

  let filteredList = this.list;

  if (FilterOne.activeFilter !== Filter.state.ALL) {
    filteredList = this.list.filter(
      (elem) => elem.isActive === FilterOne.activeFilter
    );
  }

  this.checkBtnStyle(
    filteredList,
    toDoVariables.filterBtns,
    toDoVariables.filterBtns[FilterOne.activeFilter],
    "filter-link--current"
  );

  filteredList = this.sortList(filteredList);

  this.checkBtnStyle(
    filteredList,
    toDoVariables.sortBtns,
    toDoVariables.sortBtns[AppController.activeSort],
    "sort-btn-current"
  );

  PaginationList.createPaginationPageNumber(filteredList);

  let ToDoListOnPage = PaginationList.getSliceArray(filteredList);

  if (filteredList.length > PaginationList.pageSize) {
    Filter.deleteBtnClass(
      [...toDoVariables.paginationItems],
      "pagination-item--active"
    );
    Filter.addBtnClass(
      [...toDoVariables.paginationItems][PaginationList.activePage - 1],
      "pagination-item--active"
    );
    PaginationList.activePage = 1;
  }

  toDoVariables.ul.append(this.createFragment(ToDoListOnPage));

  localStorage.setItem("TODOList", JSON.stringify(this.list));
  localStorage.setItem("activeFilter", FilterOne.activeFilter);
  localStorage.setItem("activeSort", this.activeSort);
  localStorage.setItem("activePage", PaginationList.activePage);
};

var AppController = new App();
