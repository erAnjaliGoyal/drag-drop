import React from "react";
// import('react-beautiful-dnd').then(module =>
// 	{
// 	const {DragDropContext, Droppable, Draggable}= module;
// 	console.log(Droppable);
// 	})
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import dynamic from 'next/dynamic'

// const { DragDropContext, Droppable, Draggable } = dynamic(import('react-beautiful-dnd'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })
let _DragDropContext, _Droppable, _Draggable;

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DndLoaded: false
    };
  }

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
    let {
      label,
      type,
      items,
      depthStep = 10,
      depth = 0,
      id,
      // activeId,
      subItem,
      // SetActive,
      // SetActiveCallAdd,
      // SetDelete,
      index,
      provided,
      ...rest
    } = this.props;
    const {DndLoaded} = this.state;
    // console.log(items);
    // console.log(id);
    // console.log(subItem);
    return (
      <React.Fragment>{DndLoaded &&
        <_Droppable droppableId={this.props.type} type={`droppableSubItem`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {subItem && !subItem.delete &&
                <_Draggable key={id} draggableId={id} index={index}>
                  {(provided) =>
                  (<div ref={provided.innerRef} style={{ paddingLeft: depth * depthStep }}>
                    <span {...provided.draggableProps} {...provided.dragHandleProps}>
                      {label}-{id}
                    </span>
                  </div>)}
                </_Draggable>}

              {!subItem?.delete && Array.isArray(items)
                ? items.map((subItem, index) => (
                  <SidebarItem
                    index={index}
                    // SetActive={SetActive} 
                    // SetActiveCallAdd={SetActiveCallAdd}
                    // SetDelete={SetDelete}
                    key={subItem.id}
                    id={subItem.id}
                    depth={depth + 1}
                    depthStep={depthStep}
                    // activeId={activeId}
                    {...subItem}
                    subItem={subItem}
                  />
                ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </_Droppable>
         }
      </React.Fragment>
    );
  }
}

export default SidebarItem;
