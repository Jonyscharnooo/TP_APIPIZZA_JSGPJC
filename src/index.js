import Pizza from "./models/Pizza.js";
import PizzaService from "./services/pizzaServices.js";
import express from 'express';

const app = express();
const port = 3000;
const pizzaService = new PizzaService();
app.use(express.json())
/*
{
    "nombre": "Prueba",
    "libreGluten": "true",
    "importe": "777",
    "descripcion": "Esta es una prueba para ver si funciona correctamente nuestro codigo creado por J.S, G.P & J.C"
}
*/
app.get('/api', async (req, res) => {
    const Pizzas = await pizzaService.GetAll();
    res.status(200).json(Pizzas)
})
app.get('/api/:id', async (req, res) => {
    const Pizza = await pizzaService.GetByID(req.params.id);
    res.status(200).json(Pizza)
})
app.post('/api/', async (req, res)=> {
    const pizza = new Pizza()
    pizza.nombre = req.body.nombre
    pizza.descripcion = req.body.descripcion
    pizza.libreGluten = req.body.libreGluten
    pizza.importe = req.body.importe
    await pizzaService.Create(pizza)
    res.status(201).json(pizza)
})
app.put('/api/:id', async (req, res) => {
    const id = req.params.id
    const pizza2 = new Pizza()
    pizza2.nombre = req.body.nombre
    pizza2.descripcion = req.body.descripcion
    pizza2.libreGluten = req.body.libreGluten
    pizza2.importe = req.body.importe
    await pizzaService.Update(pizza2, id)
    res.status(200).json(pizza2)
})
app.delete('/api/:id', async (req, res) => {
    const id = req.params.id
    await pizzaService.Delete(id);
    res.status(200).json(Pizza)
})
app.listen(port, () => {
    console.log(`Se esta usando el puerto: ${port}`)
})