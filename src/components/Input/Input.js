const InputText = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className={`form-control ${
          props.error && props.showError ? "is-invalid" : ""
        }`}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputSelect = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`form-control ${
          props.error && props.showError ? "is-invalid" : ""
        }`}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputCheckbox = (props) => {
  const changeFeaturesHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValue = [...props.value, value];
      props.onChange(newValue);
    } else {
      const newValue = props.value.filter((x) => x !== value);
      props.onChange(newValue);
    }
  };

  return (
    <div className="form-group">
      {props.options.map((option) => (
        <div className="custom-control custom-checkbox" key={option.value}>
          <input
            value={option.value}
            type="checkbox"
            className="custom-control-input"
            id={option.value}
            checked={props.value.find(x => x === option.value) || false}
            onChange={changeFeaturesHandler}
          />
          <label className="custom-control-label ms-1" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const InputFile = (props) => {
  const changeHandler = (e) => {
    props.onChange(e.target.files[0]);
  };

  return (
    <div className="form-group">
      <input type="file" onChange={changeHandler} ref={props.fileRef} />
    </div>
  );
};

const InputRadio = (props) => {
  return (
    <div className="form-group">
      {props.options.map((option) => (
        <div className="custom-control custom-radio" key={option.value}>
          <input
            type="radio"
            id={`radio-${option.value}-${props.name}`}
            name={props.name}
            className="custom-control-input"
            value={option.value}
            checked={props.value === option.value.toString()}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <label
            className="custom-control-label ms-1"
            htmlFor={`radio-${option.value}-${props.name}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const InputTextArea = props => {
    return (
        <div className="form-group">
          <label>{props.label}</label>
          <textarea
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            type={props.type}
            className={`form-control ${
              props.error && props.showError ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">{props.error}</div>
        </div>
      );
}

function Input(props) {
  switch (props.type) {
    case "select":
      return <InputSelect {...props} />;
    case "checkbox":
      return <InputCheckbox {...props} />;
    case "file":
      return <InputFile {...props} />;
    case "radio":
      return <InputRadio {...props} />;
    case "textarea":
      return <InputTextArea {...props} />;
    default:
      return <InputText {...props} />;
  }
}

Input.defaultProps = {
  type: "text",
  isValid: false,
  showError: false,
};

export default Input;
