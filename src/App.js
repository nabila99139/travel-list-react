import { useState } from "react";

// filter buat nyutik
// map buat foreach alias ngulangin atau ngemapping gitu loh

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  // const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    console.log(id);
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItem}
        items={items}
      />
      <Stats jenisItems={items} />
    </div>
  );
}

function Logo() {
  return <h1>✌️Far away (Win + .)</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    // handleAddItems(newItems);
    onAddItems(newItem);

    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            jenisItem={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ jenisItems }) {
  if (!jenisItems.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );

  const numItems = jenisItems.length;
  const numPacked = jenisItems.filter((jenisItem) => jenisItem.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You have everything! Ready to go`
          : `You have an ${numItems} items on your list, and you already packed x (${percentage}%)`}
      </em>
    </footer>
  );
}

function Item({ jenisItem, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={jenisItem.packed}
        onChange={() => onToggleItems(jenisItem.id)}
      />
      <span style={jenisItem.packed ? { textDecoration: "line-through" } : {}}>
        {jenisItem.quantity} {jenisItem.description}
      </span>
      <button onClick={() => onDeleteItems(jenisItem.id)}>❌</button>
    </li>
  );
}
