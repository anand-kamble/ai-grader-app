import { Request, Response, Router } from "express";
import { User } from "shared-types";

const router = Router();

router.post("/login", (req: Request<null, any, User, null>, res: Response) => {
  
  setTimeout(() => {
    res.status(200).json({ ...req.body });
  }, 2000);
});

export default router;
