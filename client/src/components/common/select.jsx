import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="mb-3 form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        {...rest}
        className="form-control form-select"
        id={name}
        name={name}
        aria-describedby={name}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
