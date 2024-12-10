import { Request, Response, Router } from "express";
import { User } from "shared-types";
import { langchainService } from "../../services/langchainService";
import { Readable } from "stream";

const router = Router();

router.post("/grade",async  (req: Request<null, any, User, null>, res: Response) => {

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  

  const stream = new Readable({
    read() {},
  });

  stream.pipe(res);

  try {
    const langchainStream = await langchainService.runnable();
    for await (const data of langchainStream) {
      try {
        stream.push(`data: ${JSON.stringify(data.agent.messages[0]?.kwargs?.content)}\n\n`);
      } catch (error) {
        console.error(error);
        
      }
    }

    stream.push(null);
  } catch (error) {
    console.error(error);
    stream.push(`data: ${JSON.stringify({ error })}\n\n`);
    stream.push(null);
  }



});

router.post("/addFile", (req: Request<null, any, User, null>, res: Response) => {
  setTimeout(() => {
    res.status(200).json({ ...req.body });
  }, 2000);
});

export default router;
