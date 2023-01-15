const { response } = require("express");
const ContactsRepository = require("../repositories/ContactsRepository");
const isValidUUID = require("../utils/isValidUUID");

class ContactController {
    async index(req, res) {
        const { orderBy } = req.query;
        const contacts = await ContactsRepository.findAll(orderBy);

        res.json(contacts);
    }

    async show(req, res) {
        // List one register
        const { id } = req.params;

        if (!isValidUUID(id)) {
            return res.status(400).json({ error: "The ID is incorrect." });
        }

        const contact = await ContactsRepository.findById(id);
        if (!contact) {
            return res.status(404).json({ error: "User Not Found" });
        }
        res.json(contact);
    }

    async store(req, res) {
        // Create new register
        const { name, email, phone, category_id } = req.body;

        if (category_id && !isValidUUID(category_id)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        if (email) {
            const contactExists = await ContactsRepository.findByEmail(email);

            if (contactExists) {
                // 400: Bad Request
                return res
                    .status(400)
                    .json({ error: "This email already exists" });
            }
        }

        const contact = await ContactsRepository.create({
            name,
            email: email || null,
            phone,
            category_id: category_id || null,
        });

        res.json(contact);
    }

    async update(req, res) {
        // Update one register
        const { id } = req.params;
        const { name, email, phone, category_id } = req.body;

        if (!isValidUUID(id)) {
            return res.status(400).json({ error: "The ID is incorrect." });
        }

        if (category_id && !isValidUUID(category_id)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        if (!name) {
            return res.status(400).json({ error: "name is required" });
        }
        const contactExists = await ContactsRepository.findById(id);
        if (!contactExists) {
            return res.status(400).json({ error: "This user does't exists" });
        }

        if (email) {
            const contactByEmail = await ContactsRepository.findByEmail(email);

            if (contactByEmail && contactByEmail.id !== id) {
                return res.status(400).json({ error: "email already exists" });
            }
        }

        const contact = await ContactsRepository.update({
            id,
            name,
            email: email || null,
            phone,
            category_id: category_id || null,
        });

        res.status(200).json(contact);
    }

    async delete(req, res) {
        // Delete one register
        const { id } = req.params;

        if (!isValidUUID(id)) {
            return res.status(400).json({ error: "The ID is incorrect." });
        }

        await ContactsRepository.delete(id);

        // 204: OK and No Content
        res.sendStatus(204);
    }
}

module.exports = new ContactController();
