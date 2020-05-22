const db = require("../database/dbConfig");
function add(user) {  return db("users").insert(user, "id");}
function findBy(filter) {  return db("users").where(filter);}module.exports = {  add,  findBy,};