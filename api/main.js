module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>US Federal Document Archive</title>
  <style>
    /* Basic Reset */
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body { width:100%; height:100%; overflow:hidden; background:#000; color:#0f0; font-family:monospace; }
    /* Fullscreen loader */
    #loader { position:fixed; top:0; left:0; width:100%; height:100%; background:#000; padding:20px; overflow:auto; }
    #loader p { white-space: pre-wrap; line-height:1.5; }
    /* Centered modal screens */
    .modal { display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#000; padding:20px; border:2px solid #0f0; }
    /* Buttons grid */
    .grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-top:15px; }
    .btn { background:#000; color:#0f0; border:2px solid #0f0; padding:15px; text-align:center; cursor:pointer; }
    /* Text inputs */
    input { background:#000; color:#0f0; border:2px solid #0f0; padding:8px; width:200px; margin:5px 0; }
    /* Library list */
    #library { display:none; position:fixed; top:5%; left:5%; right:5%; bottom:5%; background:#000; overflow:auto; padding:20px; border:2px solid #0f0; }
    #library h1 { margin-bottom:10px; }
    .doc-list { list-style:none; }
    .doc-list li { margin:10px 0; cursor:pointer; }
    /* Doc viewer */
    #docViewer { display:none; position:fixed; top:5%; left:5%; right:5%; bottom:5%; background:#000; overflow:auto; padding:20px; border:2px solid #0f0; }
    #docViewer .back { margin-bottom:10px; cursor:pointer; }
  </style>
</head>
<body>
  <!-- LOADER -->
  <div id="loader"><p id="loadText"></p></div>

  <!-- PASSCODE -->
  <div id="passcode" class="modal">
    <h2>Enter Security Passcode</h2>
    <input id="codeInput" type="password" placeholder="Passcode"><br>
    <div class="grid" id="passKeys"></div>
    <div id="passMsg"></div>
  </div>

  <!-- LOGIN -->
  <div id="login" class="modal">
    <h2>User Login</h2>
    <input id="userInput" type="text" placeholder="Username"><br>
    <input id="passInput" type="password" placeholder="Password"><br>
    <div class="btn" id="loginBtn">Login</div>
    <div id="loginMsg" style="margin-top:10px;"></div>
  </div>

  <!-- LIBRARY -->
  <div id="library">
    <h1>Document Archive</h1>
    <ul class="doc-list" id="docList"></ul>
  </div>

  <!-- DOC VIEWER -->
  <div id="docViewer">
    <div class="back btn" id="backBtn">&larr; Back</div>
    <div id="docContent"></div>
  </div>

  <script>
    // Utility
    const createKeys = (container, symbols, handler) => {
      symbols.forEach(s => {
        const b = document.createElement('div'); b.className='btn'; b.textContent=s;
        b.onclick = () => handler(s);
        container.appendChild(b);
      });
    };

    // 1) LOADING
    const steps = [
      'Initializing Secure Vault...',
      'Authenticating Protocols...',
      'Decrypting Stored Files...',
      'Validating System Integrity...',
      'Fetching Data...',
      'Scanning Environment...',
      'Encrypting Channels...'
    ];
    let idx = 0;
    const loadText = document.getElementById('loadText');
    (function load(){
      if(idx < steps.length) {
        loadText.textContent += steps[idx++] + '\n';
        setTimeout(load, 500 + Math.random()*500);
      } else {
        loadText.textContent += '\nComplete.\nRedirecting...';
        setTimeout(()=>{
          document.getElementById('loader').style.display='none';
          showPasscode();
        },1000);
      }
    })();

    // 2) PASSCODE SCREEN
    const PASS = '210866';
    function showPasscode(){
      document.getElementById('passcode').style.display='block';
      createKeys(document.getElementById('passKeys'), ['1','2','3','4','5','6','7','8','9','0','C','OK'], key=>{
        const inp = document.getElementById('codeInput');
        if(key==='C') inp.value = '';
        else if(key==='OK') checkPasscode();
        else inp.value += key;
      });
    }
    function checkPasscode(){
      const inp = document.getElementById('codeInput'), msg = document.getElementById('passMsg');
      if(inp.value===PASS){ msg.textContent='Access Granted'; setTimeout(()=>{document.getElementById('passcode').style.display='none';showLogin();},500);} 
      else { msg.textContent='Denied'; inp.value=''; }
    }

    // 3) LOGIN
    const USER='WilliamFD', PWD='13267709';
    function showLogin(){
      document.getElementById('login').style.display='block';
      document.getElementById('loginBtn').onclick = ()=>{
        const u=document.getElementById('userInput').value;
        const p=document.getElementById('passInput').value;
        const msg=document.getElementById('loginMsg');
        if(u===USER && p===PWD) { msg.textContent='Welcome'; setTimeout(()=>{document.getElementById('login').style.display='none';showLibrary();},500);} 
        else msg.textContent='Invalid';
      };
    }

    // 4) LIBRARY
    const docs = [
      { title:'Declassified CIA Report (1973)', content:'Full CIA Report...'},
      { title:'JFK Select Committee (1979)', content:'Full JFK Report...'},
      { title:'NSA Declassified (2005)', content:'Full NSA Documents...'}
    ];
    function showLibrary(){
      const list = document.getElementById('docList');
      docs.forEach((d,i)=>{
        const li = document.createElement('li'); li.textContent=d.title;
        li.onclick = ()=> showDoc(i);
        list.appendChild(li);
      });
      document.getElementById('library').style.display='block';
    }

    // 5) DOCUMENT VIEWER
    function showDoc(i){
      document.getElementById('library').style.display='none';
      const dv = document.getElementById('docViewer'); dv.style.display='block';
      document.getElementById('docContent').textContent = docs[i].content;
      document.getElementById('backBtn').onclick = ()=>{ dv.style.display='none'; document.getElementById('library').style.display='block'; };
    }
  </script>
</body>
</html>`);
};
