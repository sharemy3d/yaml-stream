const yaml = require('js-yaml');

module.exports = {
  loadAll: (stream, callback, done) => {
    const promise = new Promise((resolve, reject) => {
      stream.setEncoding('utf8');

      let completed = false;
      let data = '';

      stream.on('data', (chunk) => {
        if(completed)
          return;

        try {
          data += chunk;

          let m;
          do {
            m = /\n\.\.\.([^\n]*)\n/.exec(data);
            if(m != null) {
              const docdata = data.slice(0, m.index);
              data = data.slice(m.index + m[0].length);

              result = yaml.safeLoad(docdata);
              callback(result);
            }
          } while (m != null);
          
        } catch (error) {
          completed = true;
          reject(error);
        }
      });

      stream.on('end', () => {
        completed = true;

        const result = yaml.safeLoad(data);
        if(typeof result !== 'undefined')
          callback(result);

        resolve();
      });
      stream.on('error', (error) => {
        completed = true;
        reject(error);
      });
    });

    promise.then(() => typeof done === 'function' && done(), (err) => done(err));

    return promise;
  },
};
