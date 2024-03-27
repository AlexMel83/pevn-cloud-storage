module.exports = class UserDto {
  id;
  email;
  name;
  surname;
  phone;
  role;
  avatar;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.surname = model.surname;
    this.phone = model.phone;
    this.role = model.role;
    this.avatar = model.avatar;
  }
};
