export let token = null;
export let dataLogin = null;
export let headerToken = null;
export function asignarDataLogin(data) {
  dataLogin = data;
  token = data.token;
  headerToken = {
    headers: {
      Authorization: `Token ${data.token}`,
      "Content-type": "application/json",
    },
  };
}