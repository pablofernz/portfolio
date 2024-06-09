const { Router } = require('express');
const {createUser, getUsers, deleteUser, updateUser} = require("../handlers/userHandler")

const userRouter = Router();


userRouter.post("/register", createUser)
userRouter.get("/get", getUsers)
userRouter.delete("/:id/delete", deleteUser)
userRouter.put("/:id/update", updateUser)




module.exports = userRouter;