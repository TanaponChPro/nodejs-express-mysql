const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.tanapon = this.tanapon;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, role, tanapon) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role, user.tanapon]
    );
  }

  static getMenu(role)  {
    return db.execute(
      `SELECT tbl_menu.* FROM EakWServerDB.tbl_menu 
      INNER JOIN EakWServerDB.tbl_permission ON tbl_menu.id = tbl_permission.MenuId
      WHERE tbl_permission.RoleId = ?`,
      [role]
    );
  }
  
};
