/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({
  item,
  index,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  setEditingId,
  categories,
}) => {
  const [editText, setEditText] = useState(item.text);
  const [editCategory, setEditCategory] = useState(item.category);
  const [editPriority, setEditPriority] = useState(item.priority || 'medium');

  const handleEdit = () => {
    if (isEditing) {
      onEdit(item.id, editText, editCategory, editPriority);
    } else {
      setEditingId(item.id);
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Medium';
    }
  };

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => onToggle(item.id)}
          />
          {isEditing ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {editCategory === 'other' && (
                <input
                  placeholder="New Category"
                  type="text"
                  onChange={(e) => setEditCategory(e.target.value)}
                />
              )}
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </>
          ) : (
            <>
              <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
                {item.text}
              </span>
              <span className="category">{item.category}</span>
              <span className={`priority ${item.priority || 'medium'}`}>
                {getPriorityLabel(item.priority)}
              </span>
            </>
          )}
          <button onClick={handleEdit}>{isEditing ? '💾' : '✏️'}</button>
          <button onClick={() => onDelete(item.id)}>❌</button>
        </li>
      )}
    </Draggable>
  );
};

export default Item;
