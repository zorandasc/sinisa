import React from "react";

const Input = ({ name, label, value, error, onChange, ...props }) => {
  return (
    <div className="mb-3 form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...props}
        value={value}
        onChange={onChange}
        type="text"
        className="form-control"
        id={name}
        name={name}
        aria-describedby={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
