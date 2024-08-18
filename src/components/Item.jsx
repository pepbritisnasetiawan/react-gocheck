/* eslint-disable react/prop-types */
import { useState } from "react";

const Item = ({
  item,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  setEditingId,
}) => {
  const [editText, setEditText] = useState(item.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(item.id, editText);
    } else {
      setEditingId(item.id);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
          {item.text}
        </span>
      )}
      <button onClick={handleEdit}>{isEditing ? '💾' : '✏️'}</button>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
};

export default Item;