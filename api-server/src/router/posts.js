import express from "express";

import authMiddleware from "../middleware/auth.js";
import pool from "../db/connection.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await pool.query(`
            SELECT 
                posts.id, 
                posts.title, 
                posts.content, 
                posts.created_at,
                posts.user_id,
                users.username,
                users.email
            FROM posts
                JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC
            `);
        res.json({
            success: true,
            data: posts.rows
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query(`
            SELECT 
                posts.id, 
                posts.title, 
                posts.content, 
                posts.created_at,
                posts.user_id,
                users.username,
                users.email
            FROM posts
                JOIN users ON posts.user_id = users.id
            WHERE posts.id = $1
            `, [id]);
        if (post.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        res.json({
            success: true,
            data: post.rows[0]
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch post",
            error: error.message
        });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user_id = req.user.id;
        const post = await pool.query(`
            INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
            [title, content, user_id]
        );
        res.status(201).json({
            success: true,
            data: post.rows[0]
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create post",
            error: error.message
        });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user_id = req.user.id;
        const checkOwner = await pool.query(`SELECT user_id FROM posts WHERE id = $1`, [id]);
        if (checkOwner.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        if (checkOwner.rows[0].user_id !== user_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post"
            });
        }
        const post = await pool.query(`
            UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
            [title, content, id]
        );
        res.json({
            success: true,
            data: post.rows[0]
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update post",
            error: error.message
        });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const checkOwner = await pool.query(`SELECT user_id FROM posts WHERE id = $1`, [id]);
        if (checkOwner.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        if (checkOwner.rows[0].user_id !== user_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this post"
            });
        }
        const post = await pool.query(`
            DELETE FROM posts WHERE id = $1 RETURNING *`,
            [id]
        );
        res.json({
            success: true,
            message: "Post deleted successfully",
            data: post.rows[0]
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete post",
            error: error.message
        });
    }
});

export default router;