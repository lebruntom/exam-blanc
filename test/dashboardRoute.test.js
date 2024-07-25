import request from "supertest";
import app from "../server.js";
import jwt from "jsonwebtoken";

const secretKey = "fds4gfqdsJ5KDLjlf7Jdion8oifd9iOfnJoin$$$28fdsfdKofkDpfkdj";

describe("GET /api/dashboard/stats", () => {
  //génération d'un token pour la requete
  const token = jwt.sign({ id: 0 }, secretKey, { expiresIn: 86400 });

  it("responds with JSON containing a number of clients", async () => {
    //Appel de la route
    const response = await request(app)
      .get("/api/dashboard/stats")
      .set("token", token);
    expect(response.status).toBe(200);
    //on verifie qu'on a la propriété stats dans la reponse
    expect(response.body).toHaveProperty("stats");
  });
});

describe("GET /api/dashboard/clients", () => {
  //génération d'un token pour la requete
  const token = jwt.sign({ id: 0 }, secretKey, { expiresIn: 86400 });

  it("responds with JSON containing a number of clients", async () => {
    //Appel de la route
    const response = await request(app)
      .get("/api/dashboard/clients")
      .set("token", token);
    expect(response.status).toBe(200);
    //on verifie qu'on a la propriété clients dans la reponse
    expect(response.body).toHaveProperty("clients");
  });
});
