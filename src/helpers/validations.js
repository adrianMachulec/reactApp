export function validateEmail(text) {
  return text.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

const avaiableRules = {
  required: (value) => {
    return value ? "" : "Pole wymagane";
  },
  min(value, rule) {
    return value.length > rule.length ? "" : `Min znaków: ${rule.length}`;
  },
};

export function validate(rules = [], value) {
  for(let i = 0; i<rules.length; i++ ){
    const rule = rules[i]
    if (rule instanceof Object) {
      const errorMessage = avaiableRules[rule.rule](value, rule);
      if (errorMessage) {
        return errorMessage;
      }
    } else {
      const errorMessage = avaiableRules[rule](value);
      if (errorMessage) {
        return errorMessage;
      }
    }
  }

  return "";
}
