const express = require('express');
const router = express.Router();
const { SecondaryTable } = require('../model/SecondaryModel');  

router.post('/save-secondary-tables', async (req, res) => {
    try {
        const { primaryTableId, secondaryTables } = req.body;
        await SecondaryTable.create({
            primaryTableId: primaryTableId,
            tables: JSON.stringify(secondaryTables)
        });
        res.json({ message: 'Secondary tables saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save tables' });
    }
});


router.get('/retrieve-secondary-tables/:primaryTableId', async (req, res) => {
    try {
        const { primaryTableId } = req.params;
        const secondaryTable = await SecondaryTable.findOne({ where: { primaryTableId } });
        if (secondaryTable) {
            res.json(JSON.parse(secondaryTable.tables));
        } else {
            res.status(404).json({ error: 'No tables found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tables' });
    }
});

module.exports = router;
