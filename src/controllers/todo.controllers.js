import {asyncHandler} from '../utils/asyncHandler.js';
import {Todo} from "../models/todo.model.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/apiError.js';

const getUserTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({owner: req.user._id})
    return res
    .status(200)
    .json(new ApiResponse(200, todos, "Todos fetched successfully"))
})

const createTodo = asyncHandler(async (req, res) => {
    const {title, isCompleted} = req.body

    if (!String(title).trim() || isCompleted === undefined) {
        throw new ApiError(400, "Title and isCompleted are required")
    }
    const todo = await Todo.create({
        title,
        isCompleted,
        owner: req.user._id
    })
    return res
    .status(201)
    .json(new ApiResponse(201, todo, "Todo created successfully"))
})

const deleteTodo = asyncHandler(async (req, res) => {
    const {todoId} = req.params
    const todo = await Todo.findByIdAndDelete(todoId)
    return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo deleted successfully"))
})

const updateTodo = asyncHandler(async (req, res) => {
    const {todoId} = req.params
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, {new: true})
    return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo updated successfully"))
})

export {createTodo, deleteTodo, getUserTodos, updateTodo}