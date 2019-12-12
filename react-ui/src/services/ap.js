function sendAPIRequest(url, options, parseJson=true) {
  return window.AP.context.getToken().then(token => 
    window.fetch(url, {
      ...options,
      headers: {
        ...(options.headers ? options.headers : {}),
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      }
    })).then(response => {
      if (!response.ok) {
        return response.text().then(txt => {
          console.log(`Response (${response.status} - ${response.statusText}) : ${txt}`);
          let jsonErr = null;
          let message = txt;
          try {
            jsonErr = JSON.parse(txt);
            message = (jsonErr.errors && jsonErr.errors.name) || 
            (jsonErr.errorMessages && jsonErr.errorMessages.join(';')) || 
            (jsonErr.message) || '';
          }
          catch {}
          throw new Error(`API Error - ${message}`);
        });
      }
      return parseJson ? response.json() : response.text();
    })
}
