import { signupUser, checkUserExists } from "./authService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Liste noire de token
let revokedIds = [];

const secretKey = "fds4gfqdsJ5KDLjlf7Jdion8oifd9iOfnJoin$$$28fdsfdKofkDpfkdj";

export async function signupController(req, res) {
  const { lastname, firstname, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const result = await signupUser(lastname, firstname, email, hashedPassword);
  if (result) {
    res.status(201).send("User registered");
  } else {
    res.status(500).send("Server error");
  }
}

export async function signinController(req, res) {
  const { email, password } = req.body;

  const results = await checkUserExists(email);

  if (results.length === 0) {
    res.status(404).send("User not found");
    return;
  }

  const user = results[0];
  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    res.status(401).send("Invalid password");
    return;
  }

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });

  res.status(200).send({ auth: true, token });
}

//Controller check si le user est connecté
export function userIsLoggedController(req, res) {
  // On récupère le token dans les cookies
  const { token } = req.headers;

  try {
    // On vérifie si le token est dans la liste noire
    const decoded = jwt.decode(token, secretKey);

    if (revokedIds.includes(decoded.id)) {
      res.status(200).json({ message: "Le token a été révoqué", token: null });
    } else {
      // On vérifie le token
      var isValid = jwt.verify(token, secretKey);

      // S'il est valide, on l'envoie au front, sinon on envoie null
      if (isValid) {
        res.status(200).json({ message: "Le token est valide", token: token });
      } else {
        res
          .status(200)
          .json({ message: "Le token n'est pas valide", token: null });
      }
    }
  } catch (error) {
    res.status(200).json({ message: "Le token est vide", token: null });
  }
}
