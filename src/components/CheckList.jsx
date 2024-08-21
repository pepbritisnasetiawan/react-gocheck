/* eslint-disable react/prop-types */
import Item from './Item';

const CheckList = ({
  notes,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  setEditingId,
  categories,
}) => {
  return (
    <div className="list">
      <ul>
        {notes.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            index={index}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isEditing={item.id === editingId}
            setEditingId={setEditingId}
            categories={categories}
          />
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
