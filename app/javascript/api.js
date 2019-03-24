
function get(url) {
  return (
  fetch(url)
  .then(res => res.json())
  )
}

function post(url, data) {
  return fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "X-CSRF-Token": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
      "Content-type": "application/json"
    }
  })
  .then(res => res.json())
}

function put(url, data) {
  return fetch(url, {
    method: "put",
    body: JSON.stringify(data),
    headers: {
      "X-CSRF-Token": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
      "Content-type": "application/json"
    }
  })
  .then(res => res.json())
}

function apiDelete(url, id) {
  return fetch(url, {
    method: "delete",
    body: JSON.stringify({ id }),
    headers: {
      "X-CSRF-Token": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
      "Content-type": "application/json"
    }
  })
    .then(res => res.json())
}

export default {
  get,
  post,
  put,
  delete: apiDelete
}

