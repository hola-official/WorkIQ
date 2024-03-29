"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
;
export const SectionList = ({ items, onReorder, onEdit }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [section, setSection] = useState(items);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {
        setSection(items);
    }, [items]);
    const onDragEnd = (result) => {
        if (!result.destination)
            return;
        const items = Array.from(section);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);
        const updatedSection = items.slice(startIndex, endIndex + 1);
        setSection(items);
        const bulkUpdateData = updatedSection.map((section) => ({
            id: section._id,
            position: items.findIndex((item) => item._id === section._id)
        }));
        onReorder(bulkUpdateData);
    };
    if (!isMounted) {
        return null;
    }
    return (<DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="section">
        {(provided) => (<div {...provided.droppableProps} ref={provided.innerRef}>
            {section.map((section, index) => (<Draggable key={section._id} draggableId={section._id} index={index}>
                {(provided) => (<div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm", section.isPublished && "bg-sky-100 border-sky-200 text-sky-700")} ref={provided.innerRef} {...provided.draggableProps}>
                    <div className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition", section.isPublished && "border-r-sky-200 hover:bg-sky-200")} {...provided.dragHandleProps}>
                      <Grip className="h-5 w-5"/>
                    </div>
                    {section.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {section.isFree && (<Badge>
                          Free
                        </Badge>)}
                      <Badge className={cn("bg-slate-400 text-white", section.isPublished && "bg-blue-700 text-white")}>
                        {section.isPublished ? "Listed" : "Draft"}
                      </Badge>
                      <Pencil onClick={() => onEdit(section._id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                    </div>
                  </div>)}
              </Draggable>))}
            {provided.placeholder}
          </div>)}
      </Droppable>
    </DragDropContext>);
};
