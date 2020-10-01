httprom
=======

http with promise

Install
-------

```bash
npm install httprom
```


Usage
-----

```javascript

import http from 'httprom';

/**
 * call the http() function and pass the url.
 */
http(url)

  /**
   * call the .post() function with data and headers.
   * - if data is FormData it will be sent as such, 
   *   otherwise it will be sent as JSON string. 
   * - headers is an object with additional headers 
   *   to send.
   */
  .post(data, headers)

    /**
     * pass the response handler to the .then function
     * - if response data is json it will be parsed and 
     *   passed to the handler.
     */
    .then((data) => {})

    /**
     * pass the error handler to the .catch function
     */
    .catch((error) => {})
```

### GET

Default:

```javascript
http('http://example.com')
  .get()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
```

With custom headers:

```javascript
http('http://example.com')
  .get(null, {
    'X-Requested-With': 'XMLHttpRequest'
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
```

### POST, PUT, PATCH, DELETE, OPTIONS

Default:

```javascript
http('http://example.com')
  .post({
    key: 'value'
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
```

With custom headers:

```javascript
http('http://example.com')
  .post({
    key: 'value'
  }, 
  {
    'X-Requested-With': 'XMLHttpRequest'
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
```

With FormData:

```javascript
http('http://example.com')
  .post(new FormData(form))
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
```



License
-------

[MIT License](LICENSE)
