const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create poll
router.post('/', async (req, res) => {
    try {
        const { question, options } = req.body;
        if (!question || !options || options.length < 2) {
            return res.status(400).json({ error: 'Question and at least 2 options required' });
        }

        const poll = await db.query(
            'INSERT INTO polls (question) VALUES ($1) RETURNING *',
            [question]
        );
        
        for (const optionText of options) {
            await db.query(
                'INSERT INTO options (text, poll_id) VALUES ($1, $2)',
                [optionText, poll.rows[0].id]
            );
        }

        res.status(201).json(poll.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get poll
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const poll = await db.query('SELECT * FROM polls WHERE id = $1', [id]);
        const options = await db.query(
            'SELECT * FROM options WHERE poll_id = $1 ORDER BY id',
            [id]
        );
        
        if (poll.rows.length === 0) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        res.json({
            ...poll.rows[0],
            options: options.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Vote
router.put('/:pollId/vote', async (req, res) => {
    try {
        const { pollId } = req.params;
        const { optionId } = req.body;
        
        await db.query(
            'UPDATE options SET votes = votes + 1 WHERE id = $1 AND poll_id = $2',
            [optionId, pollId]
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;