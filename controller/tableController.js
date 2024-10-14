// const express = require('express');
// const router = express.Router();
// const { SecondaryTable } = require('../model/SecondaryModel');  

// router.post('/save-secondary-tables', async (req, res) => {
//     try {
//         const { primaryTableId, secondaryTables } = req.body;
//         await SecondaryTable.create({
//             primaryTableId: primaryTableId,
//             tables: JSON.stringify(secondaryTables)
//         });
//         res.json({ message: 'Secondary tables saved successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to save tables' });
//     }
// });


// router.get('/retrieve-secondary-tables/:primaryTableId', async (req, res) => {
//     try {
//         const { primaryTableId } = req.params;
//         const secondaryTable = await SecondaryTable.findOne({ where: { primaryTableId } });
//         if (secondaryTable) {
//             res.json(JSON.parse(secondaryTable.tables));
//         } else {
//             res.status(404).json({ error: 'No tables found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve tables' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { SecondaryTable } = require('../model/SecondaryModel');  

// Save secondary tables
// router.post('/save-secondary-tables', async (req, res) => {
//     try {
//         const { primaryTableId, secondaryTables } = req.body;
        
//         if (!primaryTableId || !secondaryTables) {
//             return res.status(400).json({ error: 'Primary table ID and secondary tables are required' });
//         }

//         await SecondaryTable.create({
//             primaryTableId: primaryTableId,
//             tables: JSON.stringify(secondaryTables) // Save the secondary tables as a JSON string
//         });

//         res.json({ message: 'Secondary tables saved successfully!' });
//     } catch (error) {
//         console.error('Error saving tables:', error);
//         res.status(500).json({ error: 'Failed to save tables' });
//     }
// });
// 
router.post('/save-secondary-tables', async (req, res) => {
    try {
        const { primaryTableId, secondaryTables } = req.body;
        console.log('Received Data:', req.body);  // Log incoming data
        
        if (!primaryTableId || !Array.isArray(secondaryTables)) {
            return res.status(400).json({ error: 'Invalid data format for secondaryTables' });
        }
        
        await SecondaryTable.create({
            primaryTableId,
            tables: JSON.stringify(secondaryTables)
        });
        res.status(200).json({
            primaryTableId: primaryTableId,
            secondaryTables: secondaryTables,
        });;
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to save tables' });
    }
});

// Retrieve secondary tables
router.get('/retrieve-secondary-tables/:primaryTableId', async (req, res) => {
    try {
        const { primaryTableId } = req.params;
        const secondaryTable = await SecondaryTable.findOne({ where: { primaryTableId } });

        if (secondaryTable) {
            res.json({ secondaryTables: JSON.parse(secondaryTable.tables) }); // Parse the JSON string
        } else {
            res.status(404).json({ error: 'No tables found' });
        }
    } catch (error) {
        console.error('Error retrieving tables:', error);
        res.status(500).json({ error: 'Failed to retrieve tables' });
    }
});

module.exports = router;
