module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>US Federal Document Archive</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; color: #0f0; font-family: monospace; overflow: auto; }
    /* LOADER full screen */
    #loader {
      z-index: 1000;
      display: block;
      width: 100vw;
      height: 100vh;
      overflow: auto;
      background: #000;
      color: #0f0;
      padding: 20px;
    }
    #loader p { line-height: 1.5; white-space: pre-wrap; }
    /* HIDDEN SCREENS */
    .screen { display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
    .keys { margin-top: 20px; }
    .key { display: inline-block; width: 60px; height: 60px; line-height: 60px; margin: 5px; border: 2px solid #0f0; cursor: pointer; user-select: none; font-size: 1.2rem; }
    input[type=text], input[type=password] {
      width: 200px; height: 30px; text-align: center; background: #000; color: #0f0;
      border: 2px solid #0f0; font-size: 1.2rem; margin: 10px 0;
    }
    /* LIBRARY */
    #library {
      display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 90vw; height: 90vh; overflow: auto; background: #fff; color: #000; padding: 20px;
    }
    #library h1 { margin-bottom: 20px; }
    .doc-btn {
      display: block; width: 100%; padding: 10px; margin: 5px 0;
      background: #000; color: #0f0; border: 2px solid #0f0; cursor: pointer; text-align: left;
    }
    /* DOC VIEWER */
    #doc-viewer {
      display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 80vw; max-height: 80vh; overflow: auto; background: #000; color: #0f0; border: 2px solid #0f0; padding: 20px;
    }
    #doc-viewer .back { display: inline-block; margin-bottom: 10px; }
  </style>
</head>
<body>
  <!-- Loader -->
  <div id="loader"><p id="loadText"></p></div>

  <!-- Passcode -->
  <div id="passcode" class="screen">
    <h1>Authorized Personnel Only – US Federal Documents</h1>
    <input id="codeInput" readonly placeholder="Enter Passcode" /><br>
    <div class="keys"></div>
    <p id="passMsg"></p>
  </div>

  <!-- Login -->
  <div id="login" class="screen">
    <h1>Secure User Login</h1>
    <input id="userInput" type="text" placeholder="Username" /><br>
    <input id="passInput" type="password" placeholder="Password" /><br>
    <div class="keys"></div>
    <p id="loginMsg"></p>
  </div>

  <!-- Library -->
  <div id="library">
    <h1>US Federal Document Archive</h1>
    <div id="doc-list"></div>
  </div>

  <!-- Document Viewer -->
  <div id="doc-viewer">
    <div class="back key">← Back</div>
    <div id="doc-content"></div>
  </div>

  <script>
    window.onload = function() {
      // Loading animation
      const steps = [
        'Initializing Secure Vault...', 'Authenticating Protocols...', 'Decrypting Stored Files...',
        'Validating System Integrity...', 'Fetching Data...', 'Scanning User Agent...', 'Establishing Secure Channel...'
      ];
      let idx = 0;
      const loadText = document.getElementById('loadText');
      function showNext() {
        if (idx < steps.length) {
          loadText.innerHTML += steps[idx++] + '<br>';
          setTimeout(showNext, 800 + Math.random() * 400);
        } else {
          loadText.innerHTML += '<br>System Online. Proceed with authentication.<br>';
          setTimeout(() => { document.getElementById('loader').style.display = 'none'; initPass(); }, 1000);
        }
      }
      showNext();

      // Utility to swap views
      function swap(hideId, showId) {
        document.getElementById(hideId).style.display = 'none';
        document.getElementById(showId).style.display = 'block';
      }

      // Passcode screen
      const correctCode = '210866';
      function initPass() {
        swap('loader', 'passcode');
        const keys = document.querySelector('#passcode .keys');
        const inp = document.getElementById('codeInput');
        [1,2,3,4,5,6,7,8,9,0].forEach(n => {
          const b = document.createElement('div');
          b.className = 'key'; b.textContent = n;
          b.onclick = () => inp.value += n;
          keys.appendChild(b);
        });
        ['T','X'].forEach(c => {
          const b = document.createElement('div'); b.className = 'key'; b.textContent = c;
          b.onclick = () => c === 'T' ? checkPass() : (inp.value = '', document.getElementById('passMsg').textContent = '');
          keys.appendChild(b);
        });
      }
      function checkPass() {
        const inp = document.getElementById('codeInput');
        const msg = document.getElementById('passMsg');
        if (inp.value === correctCode) {
          msg.textContent = 'Passcode accepted.';
          setTimeout(() => { swap('passcode','login'); initLogin(); }, 500);
        } else {
          msg.textContent = 'Incorrect passcode. Access denied.';
          setTimeout(() => { msg.textContent = ''; inp.value = ''; }, 500);
        }
      }

      // Login screen
      const validUser = 'WilliamFD', validPass = '13267709';
      function initLogin() {
        swap('passcode','login');
        const keys = document.querySelector('#login .keys');
        [{c:'L',fn:checkLogin},{c:'C',fn:() => {
          document.getElementById('userInput').value = '';
          document.getElementById('passInput').value = '';
          document.getElementById('loginMsg').textContent = '';
        }}].forEach(obj => {
          const b = document.createElement('div'); b.className = 'key'; b.textContent = obj.c; b.onclick = obj.fn;
          keys.appendChild(b);
        });
      }
      function checkLogin() {
        const u = document.getElementById('userInput').value;
        const p = document.getElementById('passInput').value;
        const msg = document.getElementById('loginMsg');
        if (u === validUser && p === validPass) {
          msg.textContent = 'Login successful.';
          setTimeout(() => { swap('login','library'); initLibrary(); }, 500);
        } else {
          msg.textContent = 'Unavailable account. Access denied.';
          setTimeout(() => { msg.textContent = ''; }, 500);
        }
      }

      // Library and documents
      const docs = [
        { title: 'Declassified CIA Report', date: '1973', content: 'Full text of Declassified CIA Report (1973)...\nLorem ipsum dolor sit amet.' },
        { title: 'JFK Select Committee Report', date: '1979', content: 'Full text of JFK Select Committee Report (1979)...\nSed do eiusmod tempor.' },
        { title: 'NSA Declassified Documents', date: '2005', content: 'Full text of NSA Declassified Documents (2005)...\nUt enim ad minim veniam.' }
      ];
      function initLibrary() {
        const list = document.getElementById('doc-list');
        docs.forEach((d,i) => {
          const btn = document.createElement('div'); btn.className='doc-btn';
          btn.textContent = d.title + ' (' + d.date + ')';
          btn.onclick = () => openDoc(i);
          list.appendChild(btn);
        });
        document.getElementById('library').style.display = 'block';
      }
      function openDoc(i) {
        swap('library','doc-viewer');
        document.getElementById('doc-content').textContent = docs[i].content;
        document.querySelector('#doc-viewer .back').onclick = () => swap('doc-viewer','library');
      }
    };
  </script>
</body>
</html>`);
};
