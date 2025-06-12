export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>United States Federal Document Archive</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#000; color:#0f0; font-family: monospace; overflow:hidden; }
    #loader, #passcode, #library { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); }
    #loader { width:80vw; height:80vh; overflow:auto; }
    #loader p { line-height:1.5; }
    #passcode, #library { display:none; text-align:center; }
    #passcode div.keys { margin-top:20px; }
    .key { 
      display:inline-block; width:50px; height:50px; line-height:50px;
      margin:5px; border:2px solid #0f0; cursor:pointer; user-select:none;
    }
    #codeInput { width:200px; height:30px; text-align:center; background:#000; color:#0f0; border:2px solid #0f0; font-size:1.2rem; }
    #library { background:#fff; color:#000; width:90vw; height:90vh; overflow:auto; padding:20px; }
    #library h1 { text-align:center; margin-bottom:20px; }
    #library ul { list-style: none; }
    #library li { margin:10px 0; }
  </style>
</head>
<body>

  <!-- 1) LOADING SCREEN -->
  <div id="loader"><p id="loadText"></p></div>

  <!-- 2) PASSCODE SCREEN -->
  <div id="passcode">
    <h1>Authorized Personnel Only – US Federal Documents</h1>
    <input id="codeInput" readonly placeholder="Enter Passcode" /><br>
    <div class="keys"></div>
    <div style="margin-top:10px;">
      <button onclick="checkCode()">✔️ Check</button>
      <button onclick="clearCode()">❌ Clear</button>
    </div>
    <p id="passMsg" style="margin-top:15px;"></p>
  </div>

  <!-- 3) DOCUMENT LIBRARY -->
  <div id="library">
    <h1>US Federal Document Archive</h1>
    <ul>
      <li><a href="https://www.foia.cia.gov/sample.pdf" target="_blank">Declassified CIA Report (1973)</a></li>
      <li><a href="https://www.archives.gov/files/research/jfk/select-committee-report.pdf" target="_blank">JFK Select Committee Report (1979)</a></li>
      <li><a href="https://www.nsa.gov/portals/75/documents/news-features/declassified-documents.pdf" target="_blank">NSA Declassified Documents (2005)</a></li>
      <!-- add more public/leaked doc links here -->
    </ul>
  </div>

  <script>
    // LOADING ANIMATION
    const steps = [
      'Initializing Secure Vault...',
      'Authenticating Protocols...',
      'Decrypting Stored Files...',
      'Validating System Integrity...',
      'Fetching Data...',
      'Scanning User Agent...',
      'Establishing Secure Channel...'
    ];
    let i=0;
    const loadText = document.getElementById('loadText');
    function showNext() {
      if (i < steps.length) {
        loadText.innerHTML += steps[i++] + '<br>';
        setTimeout(showNext, 800 + Math.random()*400);
      } else {
        loadText.innerHTML += '<br>System Online. Welcome, authorized user.<br>';
        setTimeout(() => {
          document.getElementById('loader').style.display = 'none';
          initPasscode();
        }, 1000);
      }
    }
    showNext();

    // PASSCODE KEYPAD
    const passDiv = document.getElementById('passcode');
    const keysDiv = passDiv.querySelector('.keys');
    const inp = document.getElementById('codeInput');
    const correct = '210866';
    function initPasscode(){
      passDiv.style.display='block';
      for(let n=1;n<=9;n++){
        let b=document.createElement('div');
        b.className='key'; b.textContent=n;
        b.onclick=()=>inp.value+=n;
        keysDiv.appendChild(b);
      }
      let zero=document.createElement('div');
      zero.className='key'; zero.textContent='0';
      zero.onclick=()=>inp.value+='0';
      keysDiv.appendChild(zero);
    }
    function clearCode(){ inp.value=''; passMsg(''); }
    function passMsg(txt){ document.getElementById('passMsg').textContent=txt; }
    function checkCode(){
      if(inp.value===correct){
        passMsg('Access granted… Loading.');
        setTimeout(()=> {
          passDiv.style.display='none';
          document.getElementById('library').style.display='block';
        }, 1500);
      } else {
        passMsg('Incorrect passcode… Access denied.');
        setTimeout(() => { passMsg(''); inp.value=''; }, 1500);
      }
    }
  </script>

</body>
</html>`);
}

