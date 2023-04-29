import sql from 'mssql'
import config from "../models/db.js";

export default class PizzaService {
    GetAll = async (top,orderField,sortOrder) =>{
        let returnEntity = null;
        try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .query('SELECT * FROM Pizzas');
        returnEntity = result.recordset;
        }
        catch (error){
            console.log(error)
        }
        return returnEntity;
    }
    GetByID = async (id) =>{
        let returnEntity = null;
        try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pId', sql.Int, id)
        .query('SELECT * FROM Pizzas WHERE Id = @pId;');
        returnEntity = result.recordsets[0][0];
        }
        catch (error){
            console.log(error)
        }
        return returnEntity;
    }
    Create = async (pizza) =>{
        const conn = await sql.connect(config);
        const results = await conn.request()
        .input("pNombre", pizza.nombre)
        .input("pDescripcion", pizza.descripcion)
        .input("pLibreDeGluten", pizza.libreGluten)
        .input("pImporte", pizza.importe)
        .query('INSERT INTO Pizzas (Nombre, Descripcion, LibreGluten, Importe) VALUES (@pNombre, @pDescripcion, @pLibreDeGluten, @pImporte)');
        console.log(results)
        return results;
    }
    Update = async (pizza, id) =>{
        const conn = await sql.connect(config);
        const results = await conn.request()
        .input('pId', sql.Int, id)
        .input('pNombre', sql.VarChar, pizza.nombre)
        .input('pLibreGluten', sql.Bit, pizza.libreGluten)
        .input('pImporte', sql.Int, pizza.importe)
        .input('pDescripcion', sql.VarChar, pizza.descripcion)
        .query('UPDATE Pizzas SET Nombre = @pNombre, LibreGluten = @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion  WHERE Id = @pId');
        return results;
    }
    Delete = async (id) =>{
        let rowsAffected = 0;
        try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pId', sql.Int, id)
        .query('Delete FROM Pizzas WHERE Id = @pId');
        rowsAffected = result.rowsAffected;
        }
        catch (error){
            console.log(error)
        }
        return rowsAffected;
    }
}