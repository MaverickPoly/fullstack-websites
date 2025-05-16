import {pool} from "../lib/db.js";

export const getContacts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM contacts
            ORDER BY created_at;
        `)
        res.json({message: "Fetched contacts successfully!", data: result.rows});
    } catch (e) {
        console.error(`Error getContacts: ${e}`);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const createContact = async (req, res) => {
    const {name, phone, email} = req.body;
    if (!name || !phone || !email) {
        res.status(400).json({message: "Some fields are missing!"});
    }

    try {
        const result = await pool.query(`
            INSERT INTO contacts (name, phone, email) 
            VALUES ($1, $2, $3)
            RETURNING *
        `, [name, phone, email]);
        res.status(201).json({message: "Created contact successfully!", data: result.rows[0]});
    } catch (e) {
        console.error(`Error createContact: ${e}`);
        res.status(500).json({message: "Internal server error!"});
    }
}


export const getContact = async (req, res) => {
    let {id} = req.params;

    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid Id!"});
        }

        const result = await pool.query(`
            SELECT * FROM contacts
            WHERE id = $1
        `, [id]);
        // Document not found
        if (result.rows.length === 0) {
          return res.status(404).json({message: "Contact not found!"});
        }
        res.json({message: "Fetched contact successfully!", data: result.rows[0]});
    } catch (e) {
        console.error(`Error getContact: ${e}`);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const updateContact = async (req, res) => {
    let {id} = req.params;
    const {name, phone, email} = req.body;

    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid id!"});
        }

        if (!name || !phone || !email) {
            return res.status(400).json({message: "Some fields are missing!"});
        }

        const result = await pool.query(`
        UPDATE contacts
        SET name = $1, phone = $2, email = $3
        WHERE id = $4
        RETURNING *
    `, [name, phone, email, id])
        if (result.rows.length === 0) {
            return res.status(400).json({message: "Contact not found!"});
        }
        res.json({message: "Updated contact successfully!", data: result.rows[0]});
    } catch (e) {
        console.error(`Error updateContact: ${e}`);
        res.status(500).json({message: "Internal server error!"});
    }
}

export const deleteContact = async (req, res) => {
    let {id} = req.params;

    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid id!"});
        }

        const result = await pool.query(`
            DELETE FROM contacts 
            WHERE id = $1
            RETURNING *
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({message: "Contact not found!"});
        }
        res.json({message: "Deleted contact successfully!", data: result.rows[0]});
    } catch (e) {
        console.error(`Error deleteContact: ${e}`);
        res.status(500).json({message: "Internal server error!"});
    }
}

