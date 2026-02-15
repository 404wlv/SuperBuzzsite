export function validateEmail(email) {
  return email.endsWith("@wlv.ac.uk");
}

export function validatePassword(password) {
  const regex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}
