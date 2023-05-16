const Filters = ({ setFilters, filters, maxPrice }) => {
  const handleChangeMaxPrice = (event) => {
    setFilters({ maxPrice: event.target.value })
  }

  return (
    <section className='filters'>
      <div className='filter-container'>
        <label htmlFor='price'>Price from </label>
        <input
          type='range'
          id='price'
          min='0'
          max={maxPrice}
          onChange={handleChangeMaxPrice}
          value={filters.maxPrice}
        />
        <span>{maxPrice}</span>
      </div>
    </section>
  )
}

export default Filters
