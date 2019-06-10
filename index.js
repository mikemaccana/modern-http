// Modern HTTP client
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


const JSON_TYPE = 'application/json; charset=utf-8'

var log = console.log.bind(console)

const merge = Object.assign.bind(Object)

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
const iteratorToObject = function(iterator){
  var actualHeaders = {}
  let result = iterator.next();
  while ( ! result.done ) {
    // TODO - consolidate duplicate headers using comma, see RFC2616 
    // https://stackoverflow.com/questions/4371328/are-duplicate-http-response-headers-acceptable
    actualHeaders[result.value[0]] = result.value[1];
    result = iterator.next();
  }
  return actualHeaders
}

const copyExceptKeys = function(object, exceptedKeys){
  var clone = {}
  // Object.keys() for Response objects returns no keys and no errors
  // 'var key of object' also won't work as Response objects are not iterable
  for ( let key in object) {
    if ( ! exceptedKeys.includes(key) ) {
      clone[key] = object[key]
    }
  }
  return clone 
}


const DEFAULT_HEADERS = {
  'Accept': JSON_TYPE,
  'Content-Type': JSON_TYPE 
}

var unfuckFetch = async function (url, headers, method, body) {

  headers = merge(DEFAULT_HEADERS, headers)
  const isJSON = headers['Content-Type'] === JSON_TYPE 
  if ( body && isJSON ) {
    body = JSON.stringify(body)
  }

  const rawResponse = await fetch(url, {
    method,
    headers,
    body
  })

  let response = copyExceptKeys(rawResponse, ['headers', 'body'])  
  response.headers = iteratorToObject(rawResponse.headers.entries())

  if ( response.headers["content-type"].includes("application/json")) {
    response.body = await rawResponse.json()
  }

  // TODO: handle text/plain, formdata, etc
  // arrayBuffer()
  // blob()
  // json()
  // form()
  // text()
  // See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Body

  return response
}

export default {
  // https://stackoverflow.com/questions/29775797/fetch-post-json-data
  post: async function (url, body, headers) {
    return unfuckFetch(url, headers, 'POST', body)
  },
  get: function(url, headers) {
    return unfuckFetch(url, headers, 'GET')
  }
}
