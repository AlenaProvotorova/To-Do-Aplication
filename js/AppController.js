function AppController() {
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

AppController.state = {
  fromAtoZ: 0,
  fromZtoA: 1,
};

AppController.prototype.init = function () {
  toDoVariables.btnPlus.addEventListener("click", (e) => {
    e.preventDefault = "";

    if (toDoVariables.input.value == "") {
      return false;
    } else {
      const todoItem = new ToDoItem(input.value);
      AppControllerServises.addToDoitem(todoItem);

      AppControllerServises.toLocal();
      AppControllerServises.render();
      toDoVariables.input.value = "";
    }
  });

  toDoVariables.input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      if (toDoVariables.input.value == "") {
        return false;
      } else {
        const todoItem = new ToDoItem(toDoVariables.input.value);
        AppControllerServises.addToDoitem(todoItem);

        AppControllerServises.render();

        toDoVariables.input.value = "";
      }
    }
  });

  toDoVariables.btnAll.addEventListener("click", () => {
    FilterOne.activeFilter = Filter.state.ALL;
    AppControllerServises.render();
    localStorage.setItem("activeFilter", FilterOne.activeFilter);
  });

  toDoVariables.btnActive.addEventListener("click", () => {
    FilterOne.activeFilter = Filter.state.ACTIVE;

    AppControllerServises.render();
    localStorage.setItem("activeFilter", FilterOne.activeFilter);
  });

  toDoVariables.btnCompleted.addEventListener("click", () => {
    FilterOne.activeFilter = Filter.state.INACTIVE;
    AppControllerServises.render();
    localStorage.setItem("activeFilter", FilterOne.activeFilter);
  });

  toDoVariables.btnAlphaDown.addEventListener("click", () => {
    AppControllerServises.activeSort = AppController.state.fromZtoA;
    AppControllerServises.render();
  });

  toDoVariables.btnAlphaDownAlt.addEventListener("click", () => {
    AppControllerServises.activeSort = AppController.state.fromAtoZ;
    AppControllerServises.render();
  });
};

AppController.prototype.addToDoitem = function (item) {
  this.list.push(item);
};

AppController.prototype.removeItem = function () {
  [...toDoVariables.lists].forEach((elem) => {
    elem.remove();
  });
};

AppController.prototype.deleteToDoItemById = function (id) {
  this.list = this.list.filter((elem) => elem.id !== id);
  this.render();
};

AppController.prototype.checkSortList = function (num1, num2) {
  if (this.activeSort === AppController.state.fromAtoZ) {
    this.list.sort(function (a, b) {
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
  }
};

AppController.prototype.sortList = function (list) {
  this.checkSortList(-1, 1);
  this.checkSortList(1, -1);
  return list;
};

AppController.prototype.createFragment = function (arr) {
  const fragment = new DocumentFragment();

  arr.forEach(function (elem) {
    fragment.prepend(ToDoItem.createToDoElem(elem));
  });
  return fragment;
};

AppController.prototype.checkBtnStyle = function (list, elems, elem, cl) {
  if (list.length >= 0) {
    Filter.deleteBtnClass(elems, cl);
    Filter.addBtnClass(elem, cl);
  }
};

AppController.prototype.render = function () {
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
    toDoVariables.sortBtns[AppControllerServises.activeSort],
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

var AppControllerServises = new AppController();
