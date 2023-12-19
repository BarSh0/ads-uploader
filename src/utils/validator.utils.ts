const validateEmail = (value: string) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  if (!regex.test(value)) {
    return 'Invalid email address';
  } else {
    return '';
  }
};

const validatePassword = (value: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
  if (!regex.test(value)) {
    return 'Password must be 8-12 digits, including upper and lower case letters';
  } else {
    return '';
  }
};

const validateName = (value: string) => {
  const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (!regex.test(value)) {
    return 'Invalid name';
  } else {
    return '';
  }
};

export const validatorUtils = {
  validateEmail,
  validatePassword,
  validateName,
};
