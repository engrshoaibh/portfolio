const fs = require('fs');
fetch('https://www.papertiger.com/')
  .then(r => r.text())
  .then(t => {
    const matches = t.match(/href="([^"]+\.css[^"]*)"/g);
    console.log(matches);
    if (matches) {
      const url = matches[0].match(/href="([^"]+)"/)[1];
      console.log('Fetching', url);
      return fetch(url).then(r => r.text());
    }
  })
  .then(css => {
    if (css) {
      fs.writeFileSync('papertiger.css', css);
      console.log('Saved to papertiger.css');
    }
  })
  .catch(console.error);
