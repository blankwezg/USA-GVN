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
    .keys, .doc-list { margin-top:20px; }
    .key, .doc-btn {
      display:inline-block; width:60px; height:60px; line-height:60px;
      margin:5px; border:2px solid #0f0; cursor:pointer; user-select:none;
      font-size:1.2rem;
    }
    #codeInput { width:200px; height:30px; text-align:center; background:#000; color:#0f0; border:2px solid #0f0; font-size:1.2rem; }
    #library { background:#fff; color:#000; width:90vw; height:90vh; overflow:auto; padding:20px; }
    #library h1 { text-align:center; margin-bottom:20px; }
    #doc-viewer { display:none; height:100%; }
    #doc-viewer .back { position:absolute; top:20px; left:20px; }
    #doc-viewer iframe { width:100%; height:90%; border:none; margin-top:60px; }
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
    <div class="keys">
      <div class="key">T</div>
      <div class="key">X</div>
    </div>
    <p id="passMsg" style="margin-top:15px;"></p>
  </div>

  <!-- 3) DOCUMENT LIBRARY -->
  <div id="library">
    <h1>US Federal Document Archive</h1>
    <div id="doc-list" class="doc-list"></div>
    <div id="doc-viewer">
      <div class="back key">← Back</div>
      <iframe src="" id="docFrame"></iframe>
    </div>
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
      // numeric keys
      for(let n=1;n<=9;n++){
        let b=document.createElement('div');
        b.className='key'; b.textContent=n;
        b.onclick=()=> inp.value += n;
        keysDiv.appendChild(b);
      }
      // zero key
      let zero=document.createElement('div');
      zero.className='key'; zero.textContent='0';
      zero.onclick=()=> inp.value+='0';
      keysDiv.appendChild(zero);
      // bind T and X
      document.querySelectorAll('#passcode .key').forEach(k => {
        if(k.textContent==='T') k.onclick=checkCode;
        if(k.textContent==='X') k.onclick=clearCode;
      });
    }
    function clearCode(){ inp.value=''; passMsg(''); }
    function passMsg(txt){ document.getElementById('passMsg').textContent=txt; }
    function checkCode(){
      if(inp.value===correct){
        passMsg('Access granted… Loading.');
        setTimeout(()=> {
          passDiv.style.display='none';
          initLibrary();
        }, 1500);
      } else {
        passMsg('Incorrect passcode… Access denied.');
        setTimeout(() => { passMsg(''); inp.value=''; }, 1500);
      }
    }

    // LIBRARY FUNCTIONALITY
    const docs = [
      { title: 'Declassified CIA Report', date: '1973', url: 'https://www.foia.cia.gov/sample.pdf' },
      { title: 'JFK Select Committee Report', date: '1979', url: 'https://www.archives.gov/files/research/jfk/select-committee-report.pdf' },
      { title: 'NSA Declassified Documents', date: '2005', url: 'https://www.nsa.gov/portals/75/documents/news-features/declassified-documents.pdf' }
    ];
    function initLibrary(){
      const lib = document.getElementById('library');
      const list = document.getElementById('doc-list');
      lib.style.display='block';
      docs.forEach((d,i) => {
        let btn = document.createElement('div');
        btn.className='doc-btn';
        btn.textContent = `${d.title} (${d.date})`;
        btn.onclick = () => openDoc(i);
        list.appendChild(btn);
      });
    }
    function openDoc(i){
      document.getElementById('doc-list').style.display='none';
      const viewer = document.getElementById('doc-viewer');
      viewer.style.display='block';
      document.getElementById('docFrame').src = docs[i].url;
      viewer.querySelector('.back').onclick = () => {
        viewer.style.display='none';
        document.getElementById('doc-list').style.display='block';
      };
    }
  </script>

</body>
</html>`);
}
