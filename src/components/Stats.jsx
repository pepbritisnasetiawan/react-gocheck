/* eslint-disable react/prop-types */
const Stats = ({ notes }) => {
  const totalNotes = notes.length;
  const completedNotes = notes.filter((note) => note.done).length;
  const percentage =
    totalNotes === 0 ? 0 : Math.round((completedNotes / totalNotes) * 100);

  return (
    <footer className="stats">
      <span>
        📝 Kamu punya {totalNotes} catatan dan baru {completedNotes} yang
        dichecklist ({percentage}%) ✅
      </span>
    </footer>
  );
};

export default Stats;