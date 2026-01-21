import express from "express";

import pool from "../db/connection.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, title, content, created_at FROM memos");
        res.json({
            success: true,
            data: result.rows
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM memos WHERE id = $1", [req.params.id]);
        if(result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Memo not found"
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

router.post("/", async(req, res) => {
    try {
        const {title, content} = req.body;
        const result = await pool.query("INSERT INTO memos (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await pool.query("UPDATE memos SET title = $2, content = $3 WHERE id = $1 RETURNING *", [id, title, content]);
        if(result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Memo not found"
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM memos WHERE id = $1 RETURNING *", [id]);
        if(result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: "Memo not found"
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}); 


export default router;
