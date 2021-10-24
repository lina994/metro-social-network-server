export function setUserFields(fields, user) {
  if (fields.firstName) user.firstName = fields.firstName;
  if (fields.lastName) user.lastName = fields.lastName;
  if (fields.intro) user.intro = fields.intro;
  if (fields.country) user.country = fields.country;
  if (fields.city) user.city = fields.city;
  if (fields.gender) user.gender = fields.gender;
}

