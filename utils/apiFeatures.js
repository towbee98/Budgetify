class APIfeatures {
  constructor(queryObj, queryString) {
    this.queryObj = queryObj;
    this.queryString = queryString;
  }
  // { sort, username, allocated, order, fields } = this.queryString;
  sort() {
    //Sorting
    if (this.queryString.sort) {
      if (
        this.queryString.sort === "" ||
        !["asc", "desc"].includes(this.queryString.sort.toLowerCase())
      ) {
        this.queryObj.sort = "ASC";
      } else if (this.queryString.sort === "undefined") {
        this.queryObj.sort = "ASC";
      } else {
        this.queryObj.sort = this.queryString.sort;
      }
    }
    return this;
  }
  order() {
    if (this.queryString.order) {
      if (
        this.queryString.order != "" &&
        typeof this.queryString.order != "undefined"
      ) {
        this.queryObj.order = [[this.queryString.order, this.queryObj.sort]];
      }
    }

    return this;
  }

  filter() {
    //If the operator Op is specified
    if (this.queryString.allocated) {
      switch (Object.keys(this.queryString.allocated).pop()) {
        case "gte":
          this.queryObj.where = {
            allocated: { [Op.gte]: this.queryString.allocated["gte"] },
          };
          break;
        case "gt":
          this.queryObj.where = {
            allocated: { [Op.gt]: this.queryString.allocated["gt"] },
          };
          break;
        case "lte":
          this.queryObj.where = {
            allocated: { [Op.lte]: this.queryString.allocated["lte"] },
          };
          break;
        case "lt":
          this.queryObj.where = {
            allocated: { [Op.lt]: this.queryString.allocated["lt"] },
          };
          break;
        default:
          this.queryObj.where = {
            allocated: { [Op.eq]: this.queryString.allocated },
          };
      }
    }
    return this;
  }
  //If username was specified
  userFilter() {
    if (this.queryString.username) {
      this.queryObj.where = { username: this.queryString.username };
    }
    return this;
  }
  //limits the field
  limitFields() {
    if (this.queryString.fields) {
      const field = this.queryString.fields.trim(" ").split(",");

      this.queryObj.attributes = field;
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    this.queryObj.limit = limit;
    const skip = (page - 1) * limit;
    this.queryObj.offset = skip;

    return this;
  }
}

module.exports = APIfeatures;
