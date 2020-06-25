window.addEventListener("DOMContentLoaded", function () {
  FilterOne.activeFilter = +localStorage.getItem("activeFilter") || 0;
  MediatorService.activeSort = +localStorage.getItem("activeSort") || 0;
  PaginationList.activePage =
    JSON.parse(localStorage.getItem("activePage")) || 1;
  MediatorService.list = JSON.parse(localStorage.getItem("TODOList")) || [];
  MediatorService.render();
});

function deleteBtnClass(arr, cl) {
  arr.forEach((elem) => {
    elem.classList.remove(cl);
    console.log("del");
  });
}

function addBtnClass(elem, cl) {
  elem.classList.add(cl);
  console.log("add");
}

btnPlus.addEventListener("click", (e) => {
  e.preventDefault = "";
  if (input.value == "") {
    return false;
  } else {
    const todoItem = new ToDoItem(input.value);
    MediatorService.addToDoitem(todoItem);

    MediatorService.toLocal();
    MediatorService.render();
    input.value = "";
  }
});

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    if (input.value == "") {
      return false;
    } else {
      const todoItem = new ToDoItem(input.value);
      MediatorService.addToDoitem(todoItem);

      MediatorService.render();

      input.value = "";
    }
  }
});

btnAll.addEventListener("click", () => {
  FilterOne.activeFilter = Filter.state.ALL;
  MediatorService.render();
  localStorage.setItem("activeFilter", FilterOne.activeFilter);
});

btnActive.addEventListener("click", () => {
  FilterOne.activeFilter = Filter.state.ACTIVE;

  MediatorService.render();
  localStorage.setItem("activeFilter", FilterOne.activeFilter);
});

btnComplited.addEventListener("click", () => {
  FilterOne.activeFilter = Filter.state.INACTIVE;
  MediatorService.render();
  localStorage.setItem("activeFilter", FilterOne.activeFilter);
});

faSortAlphaDown.addEventListener("click", () => {
  console.log("=======1кл====");
  MediatorService.activeSort = Mediator.state.fromZtoA;
  MediatorService.render();
});

faSortAlphaDownAlt.addEventListener("click", () => {
  console.log("=======2кл====");
  MediatorService.activeSort = Mediator.state.fromAtoZ;
  MediatorService.render();
});
