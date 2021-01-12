const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export async function get<T>(endpoint: string): Promise<T> {
  const url = BASE_URL + endpoint;
  return await fetch(url, {
    method: "GET"
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}

export async function post<T>(endpoint: string, body: unknown = {}): Promise<T> {
  const url = BASE_URL + endpoint;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body)
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
