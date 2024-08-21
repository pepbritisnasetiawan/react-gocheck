/* eslint-disable react/prop-types */
const Sort = ({sortBy, setSortBy}) => {
  return (
    <div className="sort">
      <label>Sort by: </label>
      <select name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="status">Status</option>
        <option value="alphabet">Alphabet</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  )
}

export default Sort;