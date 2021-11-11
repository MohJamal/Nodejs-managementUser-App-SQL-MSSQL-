const config = require("../models/dbconfig");
const sql = require("mssql");

const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("select * from users");

    res.json(users.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

const getUserById = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let users = await pool
      .request()
      .input("userId", sql.Int, id)
      .query("select * from users where id = @userId");
    res.json(users.recordsets[0]);
  } catch (err) {
    res.json(err);
  }
};

const addUser = async (req, res) => {
  try {
    let user = { ...req.body };
    let pool = await sql.connect(config);
    /* check if username or email is already exist */
    let userExist = await pool
      .request()
      .input("Username", sql.NVarChar, user.Username)
      .query("select id from users where username = @Username");

    let emailExist = await pool
      .request()
      .input("Email", sql.NVarChar, user.Email)
      .query("select id from users where Email = @Email");

    if (userExist.recordsets[0].length !== 0) {
      res.status(409).json("Username is already exist");
    } else if (emailExist.recordsets[0].length !== 0) {
      res.status(409).json("Email is already exist");
    } else {
      /* checked finished*/
      let users = await pool
        .request()
        .input("Username", sql.NVarChar, user.Username)
        .input("Password", sql.NVarChar, user.Password)
        .input("Email", sql.NVarChar, user.Email)
        .input("PhoneNumber", sql.Int, user.PhoneNumber)
        .input("Age", sql.Int, user.Age)
        .query(
          " insert into users values ( @Username, @Password, @Email, @PhoneNumber, @Age) "
        );
      res.status(200).json(user);
    }
  } catch (err) {
    res.json(err);
  }
};

const deleteUserById = async (req, res) => {
  let id = req.params.id;
  try {
    let pool = await sql.connect(config);
    let userExist = await pool
      .request()
      .input("Id", sql.Int, id)
      .query("select username from users where id = @Id");
    if (userExist.recordsets[0].length === 0) {
      res.status(404).json("This user is not exist");
    } else {
      let user = await pool
        .request()
        .input("userId", sql.Int, id)
        .query("delete from users where id = @userId");
      res.json("User is deleted");
    }
  } catch (err) {
    res.json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    let user = { ...req.body };
    let pool = await sql.connect(config);
    let users = await pool
      .request()
      .input("Id", sql.Int, user.Id)
      .input("Username", sql.NVarChar, user.Username)
      .input("Password", sql.NVarChar, user.Password)
      .input("Email", sql.NVarChar, user.Email)
      .input("PhoneNumber", sql.Int, user.PhoneNumber)
      .input("Age", sql.Int, user.Age)
      .query(
        " update users set  Username =  @Username , Password = @Password  , Email=  @Email , PhoneNumber =  @PhoneNumber, Age =  @Age  where Id = @Id "
      );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUser,
};
