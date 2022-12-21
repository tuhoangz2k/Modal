import React ,{useState}from 'react';
import './App.css';
import { Button, Modal } from 'antd';
import ModalComp from './Modal/Modal';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});
const reorder = (list, old_index, new_index) => {
  const result = Array.from(list);
  const [removed] = result.splice(old_index, 1);
  result.splice(new_index, 0, removed);

  return result;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [items, setItems] = useState(getItems(10));

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const index = result.source.index;
    const newIndex = result.destination.index;
    let newItems:any = reorder(items, index, newIndex);
    setItems(newItems);
  };
  
  return (
    // <div className="App" style={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center"}}>
    //         <Button type="primary" onClick={showModal}>
    //           Open Modal
    //         </Button>
    //         <ModalComp 
    //         isModalOpen={isModalOpen}
    //         handleOk={handleOk}
    //         handleCancel={handleCancel}
    //         title="Asynchronously close a modal dialog when the OK button is pressed. For example, you can use this pattern when you submit a form."></ModalComp>
    // </div>


    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id.toString()}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  );
}

export default App;
