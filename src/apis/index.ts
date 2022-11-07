import { get, post, patch, put, del } from "@/apis/request";
export const getTodo = get("/todo/:id?");
export const postTodo = post("/todo");
export const putTodo = put("/todo/:id");
export const delTodo = del("/todo/:id");
