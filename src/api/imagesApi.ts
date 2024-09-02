const BASE_URL = 'https://picsum.photos/v2/';

export function GET_IMAGES(page = 1, limit = 5): string {
  return BASE_URL + `list?page=${page}&limit=${limit}`;
}
