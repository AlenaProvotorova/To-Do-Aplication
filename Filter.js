function Filter() {
  this.activeFilter = 0;
}

Filter.state = {
  ALL: 0,
  INACTIVE: 2,
  ACTIVE: 1,
};

var FilterOne = new Filter();
