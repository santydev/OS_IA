"use client"

import { Card } from "@/components/ui/card"
import { useTasks } from "../hooks/useTasks"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

export function TaskBoard() {
  const { tasks, updateTaskStatus } = useTasks()

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    updateTaskStatus(result.draggableId, result.destination.droppableId)
  }

  const columns = {
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "inProgress"),
    done: tasks.filter((task) => task.status === "done"),
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <div key={columnId}>
            <h3 className="font-semibold mb-2 capitalize">
              {columnId.replace(/([A-Z])/g, " $1")}
            </h3>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3"
                        >
                          <h4>{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}