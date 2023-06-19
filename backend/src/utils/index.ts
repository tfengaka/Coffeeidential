export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export function formatOrderNumber(prefix: string, number: number) {
  const numberString = number.toString().padStart(10, '0');
  return prefix + numberString;
}

export function cleanHTMLTagFromString(str: string) {
  const div = document.createElement('div');
  div.innerHTML = str.trim();
  return div.textContent || div.innerText || '';
}
