const pool = require("../util/database.js");

exports.notas = class {
    constructor(titutlo, contenido, autor){
        this.titutlo = titutlo;
        this.contenido = contenido;
        this.autor = autor;
    }

    async crear(){
        const sql = `INSERT INTO notas (titulo, contenido, autor) 
        VALUES (1, 2, 3)
        RETURNING id, titutlo, contenido, autor, creada_en`;
        const { rows } = await pool.query(sql, [this.titutlo, this.contenido, this.autor]);
    }

    static async obtenerTodas(){
        const sql = `SELECT id, titulo, contenido, autor, creada_en 
        FROM notas
        ORDER BY creada_en DESC`;
        const { rows } = await pool.query(sql);
        return rows;
    }

    static async obtenerPorId(id){
        const sql = `SELECT id, titulo, contenido, autor, creada_en 
        FROM notas
        WHERE id = $1`;
        const { rows } = await pool.query(sql, [id]);
        return rows[0];
    }

    static async actualizar(id, titutlo, contenido){
        const sql = `UPDATE notas 
        SET titulo = $1, contenido = $2
        WHERE id = $3
        RETURNING id`;
        const { rows } = await pool.query(sql, [id, titutlo, contenido]);
        return rows[0];
    }

    static async eliminar(id){
        const sql = `DELETE FROM notas 
        WHERE id = $1
        RETURNING id`;
        const { rows } = await pool.query(sql, [id]);
        return rows[0] || null;
    }
}