import { db } from "../../server.js";

export async function signupUser(lastname, firstname, email, password) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (lastname, firstname, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [lastname, firstname, email, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!result);
      }
    });
  });
}

export async function checkUserExists(email) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results); // Renvoie la ligne
      }
    });
  });
}
