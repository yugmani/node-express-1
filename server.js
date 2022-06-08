//loading express
const express = require("express");
const app = express();

//activate the express json-parsor
app.use(express.json());

//Port number assigned
const PORT = 5050;

//notes array
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

//root endpoint
app.get("/", (request, response) => {
  response.send(`
    <div>    
        <h1>Hello World</h1>
        <h3> This is my first backend project using express"</h3>
    </div>
    `);
});

//endpoint to display all the array objects of notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

//endpoint to pick a specific object of notes array with its id
app.get("/api/notes/:id", (request, response) => {
  //id parameter in the route of a request
  const id = request.params.id;
  //   console.log(typeof id); //initially it is string

  //converting string into number;
  const myId = +id;
  //alternative
  //   const myId = Number(id);

  //filtering the specific array object with the requested id in notes array.
  const myNote = notes.find((note) => note.id === myId);
  //   console.log(myNote);
  if (myNote) {
    response.json(myNote);
  } else {
    response.status(404).end();
    // response.send(`
    //   <div>
    //     <h1>Error</h1>
    //     <h3>The requested data with id ${myId} is not found.</h3>
    //     <p><em>Please, try again.</em></p>
    // </div>
    //   `);
  }
});

//deleting a specific item with the id given by user
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  console.log(notes);
  response.json(notes);
});

const generateNewId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Adding an item in data
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateNewId(),
  };

  notes = [...notes, newNote];

  console.log(newNote);
  response.json(newNote);
});

//listening server on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
