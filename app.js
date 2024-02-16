const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUser = await prisma.user.findMany();
  res.json(allUser);
});

app.post("/add", async (req, res) => {
  const addUser = await prisma.user.create({
    data: req.body,
  });
  res.json(addUser);
});

app.put("/update/:id", async (req, res) => {
  const  id  = req.params.id;
  const updateData = await prisma.user.update({
    where: {id:parseInt(id)},
    data: req.body,
  });
  res.json(updateData);
});

app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const deleteData = await prisma.user.delete({where:{id:parseInt(id)}})
    res.json(deleteData)
})


app.listen(3000, () => {
  console.log("Server running...");
});
