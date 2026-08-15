const phonePattern = /^(?:0\d{9}|\+\d{12}|00\d{12})$/;

export function normalizePhoneNumber(value: string) {
  return value.trim().replace(/[\s().-]/g, "");
}

export function isValidPhoneNumber(value: string) {
  return phonePattern.test(normalizePhoneNumber(value));
}
