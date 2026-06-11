export default function Stats({ jenisItems }) {
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