const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Note = require("./data/notes");

const app = express();
const PORT = 3000;

// Middleware para permitir peticiones a la API
// el middleware
// cors nos permite hacer peticiones a la API desde cualquier origen
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/notas-MERN")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// app.use(express.static(path.join(__dirname, "public")));

// obtener todas las notas
app.get("/notas", async (req, res) => {
  try {
    const notas = await Note.find();
    res.json(notas);
  } catch (error) {
    console.log("Error al leer las notas", error);
    res.status(500).send("Error al leer las notas");
  }
});

// publicar una nueva nota
app.post("/notas", async (req, res) => {
  try {
    const nuevaNota = new Note({
      text: req.body.text,
    });
    await nuevaNota.save();
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error("Error al guardar la nota", error);
    res.status(400).send("Error al guardar la nota");
  }
});

// actualizar una nota
app.put("/notas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(
      id,
      {
        text: req.body.text,
      },
      { new: true }
    ); // Esta opción devuelve el objeto actualizado
    if (!updateNote) {
      return res.status(404).send("Nota no encontrada");
    }
    res.json(updateNote);
  } catch (error) {
    console.error("Error al actualizar la nota", error);
    res.status(400).send("ID no válido");
  }
});

app.delete("/notas/:id", async (req, res) => {
  try {
    // este código es para eliminar por id
    const nota = await Note.findByIdAndDelete(req.params.id);
    if (!nota) {
      return res.status(404).send("Nota no encontrada");
    }
    res.status(204).send();
    // este código es para eliminar por índice si tuvieramos en el script un index al momento de eliminar
    // const index = parseInt(req.params.id);
    // const notes = await Note.find();
    // if (index >= 0 && index < notes.length) {
    //   await Note.deleteOne({ _id: notes[index]._id }).then(() => {
    //     res.status(204).send();
    //   });
    // } else {
    //   res.status(404).send("Nota no encontrada");
    // }
  } catch (error) {
    console.error("Error al eliminar la nota", error);
    res.status(500).send("Error al eliminar la nota en ");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
