import { db } from "../../server.js";

export async function statsClients() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT count(*) nbClients FROM clients";
    db.query(sql, [], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results); // Renvoie la ligne
      }
    });
  });
}

export async function infosClients() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, email, firstname, lastname FROM clients";
    db.query(sql, [], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results); // Renvoie la ligne
      }
    });
  });
}

export async function deleteClient(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM clients WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!result);
      }
    });
  });
}
deleteClient;
