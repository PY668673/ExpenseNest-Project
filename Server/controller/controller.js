const model = require('../models/model.js');

// post categories
async function create_Categories(req, res) {
    const Create = new model.Categories({
        type: "Expense",
        color: "#1F3B5C"
    });

    try {
        await Create.save();
        return res.json(Create);
    } catch (err) {
        return res.status(400).json({ message: "Failed to post categories", error: err.message });
    }
}

// get categories
async function get_Categories(req, res) {
    try {
        const data = await model.Categories.find({});
        const filter = data.map(v => ({ type: v.type, color: v.color })); // Simplified mapping
        return res.json(filter);
    } catch (err) {
        return res.status(400).json({ message: "Failed to get categories", error: err.message });
    }
}

// post transactions
async function create_Transaction(req, res) {
    if (!req.body) return res.status(400).json({ message: "Transaction data is required." });
    
    const { name, type, amount } = req.body;

    try {
        const create = new model.Transaction({
            name: name,
            type: type,
            amount: amount,
            date: new Date()
        });
        
        await create.save();
        return res.json(create);
    } catch (err) {
        return res.status(400).json({ message: "Failed to post transaction", error: err.message });
    }
}

// get transactions
async function get_Transaction(req, res) {
    try {
        const data = await model.Transaction.find({});
        return res.json(data);
    } catch (err) {
        return res.status(400).json({ message: "Failed to get transactions", error: err.message });
    }
}

// delete transactions
async function delete_Transaction(req, res) {
    if (!req.body || !req.body.id) {
        return res.status(400).json({ message: "Transaction ID is required." });
    }

    try {
        const result = await model.Transaction.deleteOne({ _id: req.body.id }); // Assuming you're passing `id` in the request body
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        return res.json({ message: "Transaction deleted successfully." });
    } catch (err) {
        return res.status(500).json({ message: "Failed to delete transaction", error: err.message });
    }
}

// get labels
async function get_Labels(req, res) {
    model.Transaction.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            {
                $unwind: "$categories_info"
            }
        ]).then(result =>{
            let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color'] }));
            return res.json(data);
        }).catch (error => {
        res.status(400).json("Failed to get labels");
    })
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
};
