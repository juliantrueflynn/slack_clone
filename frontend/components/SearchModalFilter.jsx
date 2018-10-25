import React from 'react';
import classNames from 'classnames';
import './SearchModalFilter.css';

const SearchModalChannelFilter = ({
  id,
  filterType,
  label,
  filterState,
  toggle,
  children,
}) => {
  const onChange = () => toggle(`${filterType}Filter`, id);
  const isChecked = filterState.includes(id);

  const fieldClassNames = classNames('SearchModalFilter', {
    [`SearchModalFilter__${filterType}`]: filterType,
  });

  return (
    <label className={fieldClassNames}>
      <div className="SearchModalFilter__prefix">
        {children}
      </div>
      <div className="SearchModalFilter__label">{label}</div>
      <input
        type="checkbox"
        className="SearchModalFilter__checkbox"
        onChange={onChange}
        checked={isChecked}
      />
    </label>
  );
};

export default SearchModalChannelFilter;
