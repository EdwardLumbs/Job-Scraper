import express from 'express';
import path from 'path';
import cors from 'cors';
import newsRouter from './routes/news.js'
import articlesRouter from './routes/addArticles.js'

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/news', newsRouter);
app.use('/api/articles', articlesRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

app.use((err, req, res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});