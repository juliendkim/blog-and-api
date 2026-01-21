import express from "express";
import cors from "cors";

import authRouter from "./router/auth.js";
import memosRouter from "./router/memos.js";
import postsRouter from "./router/posts.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.body != null && JSON.stringify(req.body) || ""}`);
    next();
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/memos", memosRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Not Found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
