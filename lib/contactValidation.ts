const phonePattern = /^(?:0\d{9}|\+\d{12}|00\d{12})$/;

export function sanitizePhoneInput(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

export function normalizePhoneNumber(value: string) {
  return sanitizePhoneInput(value);
}

export function isValidPhoneNumber(value: string) {
  return phonePattern.test(normalizePhoneNumber(value));
}
