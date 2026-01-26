function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Rechercher par titre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tous les statuts</option>
        <option value="Ouvert">Ouvert</option>
        <option value="En cours">En cours</option>
        <option value="Résolu">Résolu</option>
      </select>
    </div>
  );
}

export default FilterBar;