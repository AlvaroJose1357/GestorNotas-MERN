const moongose = require("mongoose");
const noteSchema = new moongose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Note = moongose.model("Note", noteSchema);

module.exports = Note;
