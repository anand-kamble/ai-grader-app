import { Request, Response, Router } from "express";
import { User, UserError, UserLoginResponse } from "shared-types";
import { addUser, getUserByEmail, userExists } from "../../services/databaseService";
import Logger from "../../utils/logger";

const router = Router();
const logger = new Logger("userRoutes");

router.get("/*", (req: Request, res: Response) => {
  res.send("Oops! You're lost, this is not a valid route.");
});

router.post("/login", async (req: Request<null, any, User, null>, res: Response<UserLoginResponse>) => {
  logger.log("/login - request by user " + req.body.email);
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(401).json({ error: UserError.UserNotFound });
      return;
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      res.status(401).json({ error: UserError.IncorrectPassword });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: UserError.UnknownError });
  }
});

router.post("/register", async (req: Request<null, any, User, null>, res: Response) => {
  logger.log("/register - Adding user to database");
  const user = req.body;
  try {
    if (!user.email || !user.password || !user.firstName || !user.lastName || !user.type) {
      res.status(400).json({ error: "Missing required fields" });
      logger.warn("Missing required fields");
    } else {
      if (await userExists(user.email)) {
        res.status(400).json({ error: "User already exists" });
        logger.warn("User already exists");
      } else {
        const result = await addUser(user);
        if (!result) {
          res.status(500).json({ error: "Error adding user to database" });
          logger.error("Error adding user to database");
        } else {
          res.status(200).json({ message: "User added successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Unknown error" });
    logger.error("Error registering user");
    logger.verbose(error as string);
  }
});

export default router;
