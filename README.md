# Modern HTTP

## A modern HTTP client, using fetch without all the boilerplate.

Modern HTTP is a tiny HTTP client. It uses Fetch, and returns Promises, but saves the [boilerplate required by fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch):

 - Uses JSON by default
 - Uses real HTTP methods. No 'fetching a POST' (!?), just `.post()`
 - JavaScript objects will be automatically sent as JSON
 - Ready to use `response.body` - uses content types to decode
 - Ready to use `response.headers`. No iterators with hidden keys, `.next()` etc

## Usage

```javascript
import httpClient from './modern-http.js'
```

### GET

```javascript
let response = await httpClient.get('/api/v1/subscription/123456')
```

### POST

```javascript
let response = await httpClient.post('/api/v1/subscription', {
    email: serverVars.email,
    paymentSourceID: source.id,
    planID 
})
```

## Goals, Aims, Status etc

This is a very early work in progress, made in a few hours one morning. The aim is to: 

 - Encoding URL query strings from an Object
 - Support for plaintext etc responses

The aim is to be as small as possible, using browser technologies, but not wasting developer time for common workflows. Esentially similar to high-level mid 2010's HTTP clients like superagent, axios, etc. but built on top of modern tech, which has a few advantages (in built Promises, possible request cancellation in future). 

Essentially to make a modern HTTP client that is better, not worse, than the things it replaces.

