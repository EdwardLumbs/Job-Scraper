import express from "express";
import dotenv from 'dotenv';
import pool from "../database/db.js";
import { errorHandler } from "../error.js";
dotenv.config();

const router = express.Router();

router.post('/addArticles', async (req, res, next) => {
    const { title, image, link, category, source } = req.body;
    console.log(req.body)
    try {
        await pool.query(`INSERT INTO news (title, image, link, category, source)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (title, image, link) DO NOTHING`,
            [title, image, link, category, source]);

        res.status(201).json('Inserted Successfully');
        return
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.get('/getArticles/:category', async (req, res, next) => {
    console.log('clicked')
    const { category } = req.params;
    try {
        const data = await pool.query(`SELECT *
            FROM news
            WHERE category = $1
            ORDER BY created_at DESC
            LIMIT 5`,
            [category])

        if (data.rows.length === 0) {
            return next(errorHandler(404, 'No News found'));
        };

        res.status(200).json(data.rows);
    } catch (error) {
        next(error)
    };

});

export default router