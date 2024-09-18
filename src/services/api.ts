const route = import.meta.env.VITE_API_URL;

export const get = <T>(path: string) =>
  new Promise<T>((resolve, reject) => {
    fetch(`${route}/${path}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
    })
      .then(async (res) => {
        resolve(await res.json());
      })
      .catch((err) => reject(err));
  });

export const post = (path: string, body: unknown) =>
  fetch(`${route}/${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const put = (path: string, body: unknown) =>
  fetch(`${route}/${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const del = (path: string) =>
  fetch(`${route}/${path}`, {
    method: 'DELETE',
  });
