
export const changevalidations = {
  // letter without space
  letterswithoutspaces: /^[A-Za-z]+$/,
  //number + letter + space
  numberletterspace: /^[a-zA-Z0-9\s]*$/,
  //all except space
  allwithoutspace: /^\S*$/,
  numberwithoutpoint: /^\d+$/,
  numberrwithpoint:  /^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?$/,
  letterwithspace: /^[A-Za-z\s]+$/,
  // pattern7: null,
  // pattern8: null,
};
//masters
export const panValidation = (fieldName) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    message: `${fieldName} should be a valid PAN number.`,
  },
];

export const gstValidation = (fieldName) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[0-9A-Z]{1}$/,
    message: `${fieldName} should be a valid GST number.`,
  },
];

//number + letter + space
export const nameValidation = (fieldName, min = 2, max = 50) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[a-zA-Z0-9\s]*$/,
    message: `${fieldName} should only contain alphanumeric characters.`,
  },
  {
    min,
    message: `${fieldName} should be at least ${min} characters long`,
  },
  {
    max,
    message: `${fieldName} should not exceed ${max} characters`,
  },
];

// numbers without point
export const decimalNumberValidation = (fieldName, min = 2, max = 50) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^\d+$/, // Matches optional sign, digits, and decimal part
    message: `${fieldName} should be a valid number.`,
  },
  {
    min,
    message: `${fieldName} should be at least ${min} characters long`,
  },
  {
    max,
    message: `${fieldName} should not exceed ${max} characters`,
  },
];

// letter + space
export const lettersWithSpacesValidation = (fieldName, min = 2, max = 50) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[A-Za-z\s]+$/,
    message: `${fieldName} should only contain letters.`,
  },
  {
    min,
    message: `${fieldName} should be at least ${min} characters long`,
  },
  {
    max,
    message: `${fieldName} should not exceed ${max} characters`,
  },
];

// letter + number
export const textWithoutSpacesValidation = (fieldName, min = 2, max = 50) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[A-Za-z0-9]+$/,
    message: `${fieldName} should only contain alphanumeric character.`,
  },
  {
    min,
    message: `${fieldName} should be at least ${min} characters long`,
  },
  {
    max,
    message: `${fieldName} should not exceed ${max} characters`,
  },
];

// letters onlye
export const lettersWithoutSpacesValidation = (
  fieldName,
  min = 2,
  max = 50
) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[A-Za-z]+$/,
    message: `${fieldName} should only contain letters`,
  },
  {
    min,
    message: `${fieldName} should be at least ${min} characters long`,
  },
  {
    max,
    message: `${fieldName} should not exceed ${max} characters`,
  },
];

// number with point
export const floatNumberValidation = (fieldName, min = 2, max = 50) => [
  {
    required: true,
    message: `${fieldName} is mandatory`,
  },
  {
    pattern: /^[+-]?\d+(\.\d+)?$/,
    message: `${fieldName} should be a valid float number.`,
  },
  {
    min,
    message: `${fieldName} should be at least ${min} characters long`,
  },
  {
    max,
    message: `${fieldName} should not exceed ${max} characters`,
  },
];

// restart{123456789012345}	✅ Valid, matches the restart{imei} format.
// abcd1234	✅ Valid, matches alphanumeric format.
export const validateCommand = (rule, value) => {
  if (!value) {
    return Promise.reject("Command is required!");
  }
  const commandPattern = /^[A-Za-z0-9]+$/;
  const restartPattern = /^restart\{([0-9]{15})\}$/;
  if (!commandPattern.test(value) && !restartPattern.test(value)) {
    return Promise.reject(
      "Command must be alphanumeric or in the format restart{imei} (e.g., restart{123456789012345})."
    );
  }
  return Promise.resolve();
};
