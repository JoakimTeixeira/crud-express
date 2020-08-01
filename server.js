import express from "express";
import { router } from "./routes/members.mjs";

const app = express();
app.use(express.json());
app.use("/api/members", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
