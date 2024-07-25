import {
  infosClients,
  statsClients,
  deleteClient,
} from "./dashboardService.js";
import jwt from "jsonwebtoken";

const secretKey = "fds4gfqdsJ5KDLjlf7Jdion8oifd9iOfnJoin$$$28fdsfdKofkDpfkdj";

export async function clientsStatsController(req, res) {
  const { token } = req.headers;
  var isValid = jwt.verify(token, secretKey);

  if (isValid) {
    const results = await statsClients();
    res.status(200).json({ stats: results[0] });
  } else {
    res.status(403).json({ message: "Le token n'est pas valide", token: null });
  }
}

export async function clientsInfosController(req, res) {
  const { token } = req.headers;
  var isValid = jwt.verify(token, secretKey);

  if (isValid) {
    const results = await infosClients();
    res.status(200).json({ clients: results });
  } else {
    res.status(403).json({ message: "Le token n'est pas valide", token: null });
  }
}

export async function deleteClientController(req, res) {
  const { token } = req.headers;
  const id = req.params.id;

  var isValid = jwt.verify(token, secretKey);

  if (isValid) {
    console.log(id);
    await deleteClient(id);
    res.status(200).json({ id });
  } else {
    res.status(403).json({ message: "Le token n'est pas valide", token: null });
  }
}
