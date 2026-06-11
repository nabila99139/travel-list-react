export default function Item({ jenisItem, onDeleteItems, onToggleItems }) {
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