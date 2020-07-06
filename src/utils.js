export function browserMetaData() {
  
  var module = {
      options: [],
      header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
      dataos: [
          { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
          { name: 'Windows', value: 'Win', version: 'NT' },
          { name: 'iPhone', value: 'iPhone', version: 'OS' },
          { name: 'iPad', value: 'iPad', version: 'OS' },
          { name: 'Kindle', value: 'Silk', version: 'Silk' },
          { name: 'Android', value: 'Android', version: 'Android' },
          { name: 'Macintosh', value: 'Mac', version: 'OS X' },
          { name: 'Linux', value: 'Linux', version: 'rv' },
      ],
      databrowser: [
          { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
          { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
          { name: 'Safari', value: 'Safari', version: 'Version' },
          { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
          { name: 'Opera', value: 'Opera', version: 'Opera' },
          { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
      ],
      init: function () {
          var agent = this.header.join(' '),
              os = this.matchItem(agent, this.dataos),
              browser = this.matchItem(agent, this.databrowser);
          
          return { os: os, browser: browser };
      },
      matchItem: function (string, data) {
          var i = 0,
              j = 0,
              regex,
              regexv,
              match,
              matches,
              version;
          
          for (i = 0; i < data.length; i += 1) {
              regex = new RegExp(data[i].value, 'i');
              match = regex.test(string);
              if (match) {
                  regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                  matches = string.match(regexv);
                  version = '';
                  if (matches) { if (matches[1]) { matches = matches[1]; } }
                  if (matches) {
                      matches = matches.split(/[._]+/);
                      for (j = 0; j < matches.length; j += 1) {
                          if (j === 0) {
                              version += matches[j] + '.';
                          } else {
                              version += matches[j];
                          }
                      }
                  } else {
                      version = '0';
                  }
                  return {
                      name: data[i].name,
                      version: parseFloat(version)
                  };
              }
          }
          return { name: 'unknown', version: 0 };
      }
  };

  
  var e = module.init(),
      browser = {};

  var userLanguage = window.navigator.userLanguage || window.navigator.language;
  
  browser.osName =  e.os.name;
  browser.osVersion = e.os.version;
  browser.name = e.browser.name;
  browser.version = e.browser.version;
  browser.userAgent = navigator.userAgent;
  browser.appVersion = navigator.appVersion;
  browser.platform = navigator.platform;
  browser.vendor = navigator.vendor;
  browser.language = userLanguage;

  return browser;
};


export function currentTime() {
    return (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
}


