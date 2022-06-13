const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const connect = require("../models/db.js");
const User = require('../models/user');
const refreshTokens = {};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
      role: name,
      tanapon: password
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const {email, password} = req.body;
  // console.log('email: '+email +', password: '+password);

  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];
    const isEqual = await bcrypt.compare(password, storedUser.password);
    // console.log(storedUser);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        role: storedUser.role
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = email;

    res.status(200).json(
      { token: token, 
        refreshToken: refreshToken,
        userId: storedUser.id, 
        userrole: storedUser.role,
        username: storedUser.name,
        email: storedUser.email
      }
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.logout = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) { 
    delete refreshTokens[refreshToken];
  } 
  res.sendStatus(204); 
};
exports.refresh = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  
  if (refreshToken in refreshTokens) {
    // const user = {
    //   'username': refreshTokens[refreshToken],
    //   'role': 'admin'
    // }
    // const token = jwt.sign(user, SECRET, { expiresIn: 600 });
    // res.json({jwt: token})

    //modify
    // console.log(refreshTokens[refreshToken]);
    const email = refreshTokens[refreshToken];
    const user = await User.find(email);
    const storedUser = user[0][0];
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        role: storedUser.role
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.json({token: token})
  }
  else {
    res.sendStatus(401);
  }
}

//code temple 1
exports.GetMenuList = async (req, res, next) => {
  console.log(req.params.role);
  try {
    const menulist = await User.getMenu(req.params.role);
    res.send(menulist[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

//code temple 2
exports.GetMenubyRole = async (req, res, next) => {
  console.log(req.params.role);
  try {
    const menulist = await getMenubyRole(req.params.role);
    res.send(JSON.parse(menulist))
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

var getMenubyRole = (role) => {
  let sql = `SELECT tbl_menu.* FROM EakWServerDB.tbl_menu 
  INNER JOIN EakWServerDB.tbl_permission ON tbl_menu.id = tbl_permission.MenuId
  WHERE tbl_permission.RoleId = ?`

  return new Promise(function (resolve, reject) {
    connect.connect(() => {
      //รันคำสั่ง SQL
      connect.query(sql, [role], (err, result) => {

        if (err) {
          console.log(err);
          return reject(err);
        }

        if (result == null) {
          return reject({ message: "Mysql Error" });
        }
        //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
        resolve(JSON.stringify(result));
      })

    });

  });
}
