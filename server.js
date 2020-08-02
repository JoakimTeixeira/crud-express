import express from "express";
import { router } from "./routes/members.mjs";
import exphbs from "express-handlebars";

const app = express();
app.use(express.json());
app.use("/api/members", router);

// Express handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Homepage route
app.get("/", (req, res) => {
  res.render("home", {
    title: "Member list",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
