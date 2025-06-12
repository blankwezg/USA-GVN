module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>United States Federal Document Archive</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; color: #0f0; font-family: monospace; overflow: hidden; }
    .screen { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; display: none; }
    #loader { display: block; width: 80vw; height: 80vh; overflow: auto; }
    #loader p { line-height: 1.5; }
    .keys { margin-top: 20px; }
    .key { display: inline-block; width: 60px; height: 60px; line-height: 60px; margin: 5px; border: 2px solid #0f0; cursor: pointer; user-select: none; font-size: 1.2rem; }
    input[type=text], input[type=password] { width: 200px; height: 30px; text-align: center; background: #000; color: #0f0; border: 2px solid #0f0; font-size: 1.2rem; margin: 10px 0; }
    #library { display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90vw; height: 90vh; padding: 20px; overflow: auto; background: #fff; color: #000; }
    #library h1 { margin-bottom: 20px; color: #000; }
    .doc-btn { display: block; width: 100%; padding: 10px; margin: 5px 0; border: 2px solid #0f0; background: #000; color: #0f0; cursor: pointer; text-align: left; font-size: 1rem; }
    #doc-viewer { display: none; position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); width: 80vw; max-height: 80vh; padding: 20px; overflow: auto; border: 2px solid #0f0; background: #000; color: #0f0; }
    #doc-viewer .back { display: inline-block; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div id="loader" class="screen"><p id="loadText"></p></div>
  <div id="passcode" class="screen">
    <h1>Authorized Personnel Only – US Federal Documents</h1>
    <input id="codeInput" readonly placeholder="Enter Passcode" /><br>
    <div class="keys"></div>
    <p id="passMsg"></p>
  </div>
  <div id="login" class="screen">
    <h1>Secure User Login</h1>
    <input id="userInput" type="text" placeholder="Username" /><br>
    <input id="passInput" type="password" placeholder="Password" /><br>
    <div class="keys"></div>
    <p id="loginMsg"></p>
  </div>
  <div id="library">
    <h1>US Federal Document Archive</h1>
    <div id="doc-list"></div>
  </div>
  <div id="doc-viewer">
    <div class="back key">← Back</div>
    <div id="doc-content"></div>
  </div>
  <script>
    const steps = [
      'Initializing Secure Vault...',
      'Authenticating Protocols...',
      'Decrypting Stored Files...',
      'Validating System Integrity...',
      'Fetching Data...',
      'Scanning User Agent...',
      'Establishing Secure Channel...'
    ];
    let idx = 0;
    const loadText = document.getElementById('loadText');
    function showNext() {
      if (idx < steps.length) {
        loadText.innerHTML += steps[idx++] + '<br>';
        setTimeout(showNext, 800 + Math.random() * 400);
      } else {
        loadText.innerHTML += '<br>System Online. Proceed with authentication.<br>';
        setTimeout(() => { swap('loader','passcode'); initPass(); }, 1000);
      }
    }
    showNext();
    function swap(hide, show) {
      document.getElementById(hide).style.display = 'none';
      document.getElementById(show).style.display = 'block';
    }

    const correctCode = '210866';
    function initPass() {
      swap('loader','passcode');
      const keys = document.querySelector('#passcode .keys');
      const inp = document.getElementById('codeInput');
      [1,2,3,4,5,6,7,8,9,0].forEach(n => {
        const b = document.createElement('div');
        b.className = 'key';
        b.textContent = n;
        b.onclick = () => inp.value += n;
        keys.appendChild(b);
      });
      const check = document.createElement('div');
      check.className = 'key';
      check.textContent = 'T';
      check.onclick = checkPass;
      keys.appendChild(check);
      const clr = document.createElement('div');
      clr.className = 'key';
      clr.textContent = 'X';
      clr.onclick = () => { inp.value = ''; document.getElementById('passMsg').textContent = ''; };
      keys.appendChild(clr);
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

    const validUser = 'WilliamFD';
    const validPass = '13267709';
    function initLogin() {
      swap('passcode','login');
      const keys = document.querySelector('#login .keys');
      const loginBtn = document.createElement('div');
      loginBtn.className = 'key';
      loginBtn.textContent = 'L';
      loginBtn.onclick = checkLogin;
      keys.appendChild(loginBtn);
      const clearBtn = document.createElement('div');
      clearBtn.className = 'key';
      clearBtn.textContent = 'C';
      clearBtn.onclick = () => {
        document.getElementById('userInput').value = '';
        document.getElementById('passInput').value = '';
        document.getElementById('loginMsg').textContent = '';
      };
      keys.appendChild(clearBtn);
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

    const docs = [
      { title: 'Declassified CIA Report', date: '1973', content: 'Full text of Declassified CIA Report (1973)...\nLorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'JFK Select Committee Report', date: '1979', content: 'Full text of JFK Select Committee Report (1979)...\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'NSA Declassified Documents', date: '2005', content: 'Full text of NSA Declassified Documents (2005)...\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris.' }
    ];
    function initLibrary() {
      const list = document.getElementById('doc-list');
      docs.forEach((d, i) => {
        const btn = document.createElement('div');
        btn.className = 'doc-btn';
        btn.textContent = d.title + ' (' + d.date + ')';
        btn.onclick = () => openDoc(i);
        list.appendChild(btn);
      });
      document.getElementById('library').style.display = 'block';
    }
    function openDoc(i) {
      document.getElementById('library').style.display = 'none';
      const viewer = document.getElementById('doc-viewer');
      const content = document.getElementById('doc-content');
      content.textContent = docs[i].content;
      viewer.style.display = 'block';
      viewer.querySelector('.back').onclick = () => {
        viewer.style.display = 'none';
        document.getElementById('library').style.display = 'block';
      };
    }
  </script>
</body>
</html>`);
};
