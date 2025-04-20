import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";
import Spacer from "../../../common/components/ui/Spacer";

interface DroppableProps {
    id: string;
}

export const Droppable: FC<DroppableProps> = ({ id }) => {

    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });


    const style = {
        opacity: isOver ? 1 : 0.5,
        backgroundColor: isOver ? 'green' : 'transparent',
    };

    return <div className="w-100 h-100" ref={setNodeRef} style={style}>
        <Spacer axis="horizontal" size={32} />
    </div>;
};


