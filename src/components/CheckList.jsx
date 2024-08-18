/* eslint-disable react/prop-types */
import Item from "./Item";

const CheckList = ({
  notes,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  setEditingId,
}) => {
  return (
    <div className="list">
      <ul>
        {notes.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isEditing={item.id === editingId}
            setEditingId={setEditingId}
          />
        ))}
      </ul>
    </div>
  );
};

export default CheckList;