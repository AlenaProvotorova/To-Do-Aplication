function ToDoItem(text) {
  this.id = Date.now();
  this.isActive = Filter.state.ACTIVE;
  this.text = text;
}

ToDoItem.createToDoElem = function (elem) {
  const elemLi = ToDoItem.createTemplate("list-item", "li");
  const elemDiv = ToDoItem.createTemplate("icon", "div");
  const elemIcon = ToDoItem.createTemplate("far fa-square", "i");
  const elemText = ToDoItem.createTemplate("text", "span", elem.text);
  const deleteBtn = ToDoItem.createTemplate("delete", "div", "delete");

  elemDiv.append(elemIcon);
  elemLi.append(elemDiv);
  elemLi.append(elemText);
  elemLi.append(deleteBtn);

  ToDoItem.toggleStatus(elem, elemIcon, elemText);

  elemDiv.addEventListener("click", () => {
    elem.isActive =
      ToDoItem.isActive === Filter.state.INACTIVE
        ? Filter.state.ACTIVE
        : Filter.state.INACTIVE;

    ToDoItem.toggleStatus(elem, elemIcon, elemText);
    MediatorService.render();
  });

  deleteBtn.addEventListener("click", () => {
    MediatorService.deleteToDoItemById(elem.id);
    MediatorService.render();
  });

  return elemLi;
};

ToDoItem.createTemplate = function (clName, typeElem, value) {
  const elem = document.createElement(typeElem);
  elem.className = clName;
  elem.textContent = value;

  return elem;
};

ToDoItem.toggleStatus = function (elem, icon, text) {
  if (elem.isActive === Filter.state.ACTIVE) {
    icon.classList.remove("fa-check-square");
    icon.classList.add("fa-square");
    text.classList.remove("text--unactive");
  } else {
    icon.classList.remove("fa-square");
    icon.classList.add("fa-check-square");
    text.classList.add("text--unactive");
  }
};
