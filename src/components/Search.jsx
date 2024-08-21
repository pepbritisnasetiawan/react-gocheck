/* eslint-disable react/prop-types */
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
