const express =require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')


const app = express();

let todos = [
    {
        id: 1,
        text: 'Learn React',
        completed: true
    },
    {
        id: 2,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 3,
        text: 'Learn GraphQL',
        completed: false
    },
    {
        id:4,
        text:'learn mangoes',
        completed:true
    },
    {
        id:5,
        text:'learn db',
        completed:true
    },
    {
        id:6,
        text:'learn sql',
        completed:true
    },
    {
        id:5,
        text:'learn mysql',
        completed:true
    },
    {
        id:6,
        text:'learn node',
        completed:true
    },
    {
        id:7,
        text:'learn node.js',
        completed:true
    },
    {
        id:8,
        text:'learn database',
        completed:true
    },
    {
        id:9,
        text:'learn mangodb',
        completed:true
    },
    {
        id:10,
        text:'learn python',
        completed:true
    },
    {
        id:11,
        text:'learn php',
        completed:true
    },
    {
        id:12,
        text:'learn c',
        completed:true
    },
    {
        id:13,
        text:'learn javascript',
        completed:true
    },
    {
        id:14,
        text:'learn c++',
        completed:true
    },
    {
        id:15,
        text:'learn unix',
        completed:true
    },
];

app.use(cors());

function logger(req, res, next) {
    console.log(`${req.method} ${req.path} `);
    next();
}
// app.use(express.static(path.join(__dirname,'todo6')))
app.use(logger);
app.use(bodyParser.json());
function responseBuilder(sucess,error,data)
{
    return{
        sucess,error,data
    }
}

app.get("/", (req, res, next) => {
    res.json({ message: "Hello World" })
});

// app.get("/api/todos", (req, res) => {
//     return res.status(200).json(responseBuilder(true,null,{todos}))
      
    
//  });
 
app.get("/api/todos/:id", (req, res) => {
    console.log({ params: req.params, query:req.query, body:req.body})
    const id = req.params.id;
    const todo = todos.find((todo => todo.id === parseInt(id)));
    if(!todo){
        return res.status(400).json(responseBuilder(false,'todo with the id -${id} not found',null));
            }
     return res.status(200).json(responseBuilder(true,null,{todos:todo}))
       
});
app.get("/api/todos",(req,res)=>{
    const search = req.query.search
    
    if(search){
        let filteredTodos = todos.filter(todo=>(todo.text.toLowerCase().includes(search.toLowerCase())));
    return res.status(200).json(responseBuilder(true,null,{todos : filteredTodos}))
    }
    return res.status(200).json(responseBuilder(true,null,{todos}))
    
})
// app.get("/api/todos",(req,res) => {
//     const search = req.query.search
//     const page = parseInt(req.query.page) || 1
//     const limit = 5
//     return res.status(200).json(responseBuilder(true,null,{todos:todos.slice((page*limit)-limit,page*limit)}))
// })

app.post("/api/todos/", (req, res) => {
    const text = req.body.text;
    if(!text) {
        return res.status(400).json(responseBuilder(false,'you must provide todo',null))
        
    
    }
    const newTodo = {
        id: todos.length + 1,
        text: text,
        completed: false
    }

    todos.push(newTodo)

    return res.status(200).json(responseBuilder(true,null,{todos:newTodo}));
     
  
})
app.delete("/api/todos/:id", (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex((todos)=>todos.id === parseInt(id));
    console.log(id,todoIndex)
    if(todoIndex == -1) {
        return res.status(400).json(responseBuilder(false,'todo not found -${id}',null));
    }
        let deletedTodo = todos.splice(todoIndex,1);
        return res.status(200).json(responseBuilder(true,null,{todos : deletedTodo}));
    
    
  
})
app.patch("/api/todos/:id", (req, res) => {
    console.log({ params: req.params, query:req.query, body:req.body})
    const id = req.params.id;
    const data = req.body;
    let todo = todos.find((todo => todo.id === parseInt(id)));
    const todoIndex = todos.findIndex((todo => todo.id === parseInt(id)));
    if(!todo){
        return res.status(400).json(responseBuilder(false,'todo with the id -${id} not found',null));
            }
            todo = {...todo,...data};
           todos.splice(todoIndex,1,todo) 
     return res.status(200).json(responseBuilder(true,null,{todos:todo}))
            
});

app.listen(4000, () => console.log('Server started on port 4000'));


