import decode from 'jwt-decode';

export function loggedIn() {
  const token = getToken()
  return !!token && !isTokenExpired(token);
}

export function isTokenExpired(token) {
  try {
    return (decode(token).exp < Date.now() / 1000);// Checking if token is expired. N
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

export function setToken(token) {
  // Saves user token to localStorage
  localStorage.setItem('jwt', token)
}

export function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('jwt')
}

export function logout() {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('jwt');
}

export function getUsername() {
  // Using jwt-decode npm package to decode the token
  return decode(getToken()).data;
}
