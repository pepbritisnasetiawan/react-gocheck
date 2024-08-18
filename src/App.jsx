/* eslint-disable react/prop-types */
import './App.css';

const listItems = [
  {
    id: 1,
    title: 'Eat',
    done: true,
  },
  {
    id: 2,
    title: 'Sleep',
    done: false,
  },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <CheckList />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return <span className="logo">📝 GoCheck ✅</span>;
};

const Form = () => {
  return (
    <div className="add-form">
      <h3>Ada yang mau dicatat? 🤔</h3>
    </div>
  );
};

const CheckList = () => {
  return (
    <div className="list">
      <ul>
        {listItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <input type="checkbox" />
      <span style={{ textDecoration: item.done ? 'line-through' : '' }}>
        {item.title}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <span>📝 Kamu punya x catatan dan baru x yang dichecklist (x%) ✅</span>
    </footer>
  );
};

export default App;
