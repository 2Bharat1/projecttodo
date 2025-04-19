"use client"

import { useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TodoList() {
  // State to store the list of todos
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: "Learn React basics", completed: false },
    { id: 2, text: "Build a simple todo app", completed: false },
    { id: 3, text: "Add styling with Tailwind CSS", completed: false },
  ])

  // State to store the current input value
  const [newTodo, setNewTodo] = useState("")

  // Function to add a new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return

    // Create a new todo with a unique ID
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    // Add the new todo to the list
    setTodos([...todos, todo])

    // Clear the input field
    setNewTodo("")
  }

  // Function to toggle the completed status of a todo
  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Function to delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Count completed and remaining todos
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-xl font-bold text-center">Intern Todo List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Input form to add new todos */}
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo()
              }}
              className="flex-1"
            />
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Todo stats */}
          <div className="flex justify-between mb-4 text-sm">
            <Badge variant="outline" className="bg-green-50">
              {completedCount} completed
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              {remainingCount} remaining
            </Badge>
          </div>

          {/* List of todos */}
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    todo.completed ? "bg-muted/50" : "bg-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant={todo.completed ? "default" : "outline"}
                      className="h-6 w-6"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed && <Check className="h-3 w-3" />}
                    </Button>
                    <span className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>{todo.text}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

