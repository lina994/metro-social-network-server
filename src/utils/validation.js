import validator from 'validator';

export function isPositiveInteger(str) {
  return /^([1-9]\d*)$/.test(str);
}

export function isEmail(str) {
  return validator.isEmail(str);
}

// Minimum 6 and maximum 15 characters, 
// at least one letter (uppercase or lowercase)
// at least one number
// possible characters: A-Z a-z 0-9 @ $ ! % * ? &
export function isPassword(str){
	return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,15}$/.test(str);
}


