const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
    // Error Handler (Middleware Express)
    async index(req, res) {
        const categories = await CategoriesRepository.findAll();
        res.json(categories);
    }

    async store(req, res) {
        const { name } = req.body;

        if (!name){
            return res.status(400).json({ error: 'Name is required' });
        }

        const category = await CategoriesRepository.create({ name });
        res.json(category);
    }

    async show(req, res) {
        const { id } = req.params;
        const category = await CategoriesRepository.findById(id);

        if (!category) {
            return res.status(400).json({ error: 'User does not exists' });
        }

        res.status(200).json(category);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const categoryExists = await CategoriesRepository.findById(id);

        if (!id) {
            return res.status(400).json({ error: 'Id is required' });
        }

        if (!categoryExists) {
            return res.status(400).json({ error: 'This category does not exists' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const categoryUpdated = await CategoriesRepository.update(id, { name });
        res.json(categoryUpdated);
    }

    async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Id is required' });
        }

        await CategoriesRepository.delete(id);
        res.sendStatus(204);

    }
}

module.exports = new CategoryController;
