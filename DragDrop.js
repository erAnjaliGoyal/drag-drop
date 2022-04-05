import React from "react";
import SidebarItem from "./SidebarItem";
// import dynamic from 'next/dynamic'
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { getServerSideProps } from "next";
// import { resetServerContext } from "react-beautiful-dnd";

// const { DragDropContext, Droppable, Draggable } = dynamic(import('react-beautiful-dnd'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })
// console.log(DragDropContext);
let _DragDropContext, _Droppable, _Draggable;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 8;


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class DragDrop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      DndLoaded: false,
      items: [
        {
          "id": "f8be63f7-5549-4cd9-b4d7-97881da7b105",
          "name": "Untitled Doc",
          "label": "Untitled Doc",
          "type": "File",
          "parent": "624145dfec8c260b75b0ffdd",
          "delete": false
        },
        {
          "id": "f5929399-cc18-4511-ba68-7e5d8314df55",
          "name": "Untitled Doc",
          "label": "Untitled Doc",
          "type": "File",
          "parent": "624145dfec8c260b75b0ffdd",
          "delete": false
        },
        {
          "id": "7b5bc330-cb39-4887-9151-654c3a7be01f",
          "name": "Untitled Doc",
          "label": "Untitled Doc",
          "type": "File",
          "parent": "624145dfec8c260b75b0ffdd",
          "delete": false
        },
        {
          "id": "eb0682a7-9e47-4faa-a0c4-ef4670839a23",
          "name": "Untitled Doc",
          "label": "Untitled Doc",
          "type": "File",
          "parent": "624145dfec8c260b75b0ffdd",
          "delete": false
        },
        {
          "id": "bdf81ece-c471-4a3b-a766-fc2e656d364c",
          "name": "Untitled Doc",
          "label": "Untitled Doc",
          "type": "File",
          "parent": "624145dfec8c260b75b0ffdd",
          "delete": false
        },
        {
          "id": "3dc5e38a-84a7-4a07-a98a-b42e26d42fde",
          "name": "Untitled Doc",
          "label": "Untitled Doc",
          "type": "File",
          "parent": "624145dfec8c260b75b0ffdd",
          "delete": false
        },
        {
          "id": "e9809063-28dd-4700-bd89-282334a9dc8a",
          "name": "Untitled Fol",
          "label": "Untitled Fol",
          "type": "Folder",
          "parent": "624145dfec8c260b75b0ffdd",
          "items": [
            {
              "id": "0d73c82a-ad41-4f5d-9cf9-744e9b923fc3",
              "name": "Untitled Fol",
              "label": "Untitled Fol",
              "type": "Folder",
              "parent": "e9809063-28dd-4700-bd89-282334a9dc8a",
              "items": [],
              "delete": false
            }
          ],
          "delete": false
        }
      ]
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    console.log(result);
    console.log("innner drag");
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      const items = reorder(this.state.items, sourceIndex, destIndex);

      this.setState({
        items
      });
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = this.state.items.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...this.state.items];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });
        this.setState({
          items: newItems
        });
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });
        this.setState({
          items: newItems
        });
      }
    }
  }

  onDragEnd1(result) {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  renderSideBarList = () => {
    const { items, DndLoaded } = this.state;
    // console.log(items);
    console.log("rederkist");
    console.log(DndLoaded)
    //     console.log(Draggable)
    //     console.log(Droppable)
    return (<React.Fragment>
      {DndLoaded ? <_DragDropContext onDragEnd={this.onDragEnd}>
        <_Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              <SidebarItem 
              ref={provided.innerRef}
                {...provided.droppableProps}
                items={items}
              >
                {provided.placeholder}
              </SidebarItem>
            </div>
          )}
        </_Droppable>
      </_DragDropContext > : null}
      </React.Fragment>);

  };
  
  async componentDidMount() {
    console.log("mount");
    const { DragDropContext, Droppable, Draggable } = (await import("react-beautiful-dnd"));
    _DragDropContext = DragDropContext
    _Droppable = Droppable
    _Draggable = Draggable
    console.log(_DragDropContext)  
        console.log(_Draggable)
        console.log(_Droppable)
        this.setState({DndLoaded: true})

    // new Quill("#editor", { theme: "snow" });
  }


  render() {
    return (<div>{this.renderSideBarList()}</div>)
  }
}


// export const getServerSideProps = async ({ query }) => {

//   resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

//   return { props: { data: [] } }

// }


// export async function getServerSideProps(context) {
//     resetServerContext()   
//     return {props: { data : []}}
//   }
export default DragDrop