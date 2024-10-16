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
const { RandomTable } = require('../model/SecondaryModel');  

// router.post('/save-secondary-tables', async (req, res) => {
//     try {
//         const { primaryTableId, secondaryTables } = req.body;
//         console.log('Received Data:', req.body);  // Log incoming data
//         console.log(req.body.secondaryTables)
//         if (!primaryTableId || !Array.isArray(secondaryTables)) {
//             return res.status(400).json({ error: 'Invalid data format for secondaryTables' });
//         }
        
//         await SecondaryTable.create({
//             primaryTableId,
//             tables: JSON.stringify(secondaryTables)
//         });
//         res.status(200).json({
//             primaryTableId: primaryTableId,
//             secondaryTables: secondaryTables,
//         });;
//     } catch (error) {
//         console.error('Database Error:', error);
//         res.status(500).json({ error: 'Failed to save tables' });
//     }
// });

// Save secondary tables
router.post('/save-secondary-tables', async (req, res) => {
    try {
        const { primaryTableId, primaryTable,secondaryTables } = req.body;
        console.log('Received Data:', req.body); // Log incoming data
        const IdExist = await RandomTable.findByPk(primaryTableId)
        if(IdExist) return res.status(401).json({message: `primaryTableId ${primaryTableId} already exists`})
        // Check if primaryTableId and secondaryTables are provided
        if (!primaryTableId || !Array.isArray(secondaryTables)) {
            return res.status(400).json({ error: 'Invalid data format for primaryTableId or secondaryTables' });
        }
        // Save the secondary tables
        const data = await RandomTable.create({
            primaryTableId,
            primary:JSON.stringify(primaryTable),
            secondary: JSON.stringify(secondaryTables) 
        });
        res.status(200).json({
            message: 'Secondary tables saved successfully!',
            data
        });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to save tables' });
    }
});


// Retrieve secondary tables
router.get('/retrieve-secondary-tables/:primaryTableId', async (req, res) => {
    try {
        const { primaryTableId } = req.params;
        const random = await RandomTable.findOne({ where: { primaryTableId } });
        if (random) {
            res.json({
                primary: JSON.parse(random.primary),     // Send back the primary table
                secondary: JSON.parse(random.secondary)
             }); 
            console.log("here")
        } else {
            res.status(404).json({ error: 'No tables found' });
        }
    } catch (error) {
        console.error('Error retrieving tables:', error);
        res.status(500).json({ error: 'Failed to retrieve tables' });
    }
});

module.exports = router;
