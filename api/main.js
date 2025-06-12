module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>United States Federal Document Archive</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#000; color:#0f0; font-family: monospace; overflow:hidden; }
    .screen { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; display:none; }
    #loader { display:block; width:80vw; height:80vh; overflow:auto; }
    #loader p { line-height:1.5; }
    .keys, .doc-list { margin-top:20px; }
    .key, .doc-btn {
      display:inline-block; width:60px; height:60px; line-height:60px;
      margin:5px; border:2px solid #0f0; cursor:pointer; user-select:none;
      font-size:1.2rem;
    }
    input[type=text], input[type=password] {
      width:200px; height:30px; text-align:center; background:#000; color:#0f0;
      border:2px solid #0f0; font-size:1.2rem; margin:10px 0;
    }
    #library { background:#fff; color:#000; width:90vw; height:90vh; overflow:auto; padding:20px; }
    #library h1 { text-align:center; margin-bottom:20px; }
    #doc-viewer { display:none; height:100%; }
    #doc-viewer .back { position:absolute; top:20px; left:20px; width:80px; height:40px; line-height:40px; background:#000; color:#0f0; border:2px solid #0f0; }
    #doc-viewer iframe { width:100%; height:90%; border:none; margin-top:60px; }
  </style>
</head>
<body>

  <!-- LOADING -->
  <div id="loader" class="screen"><p id="loadText"></p></div>

  <!-- PASSCODE -->
  <div id="passcode" class="screen">
    <h1>Authorized Personnel Only – US Federal Documents</h1>
    <input id="codeInput" readonly placeholder="Enter Passcode" /><br>
    <div class="keys"></div>
    <p id="passMsg"></p>
  </div>

  <!-- LOGIN -->
  <div id="login" class="screen">
    <h1>Secure User Login</h1>
    <input id="userInput" type="text" placeholder="Username" /><br>
    <input id="passInput" type="password" placeholder="Password" /><br>
    <div class="keys"></div>
    <p id="loginMsg"></p>
  </div>

  <!-- LIBRARY -->
  <div id="library">
    <h1>US Federal Document Archive</h1>
    <div id="doc-list" class="doc-list"></div>
    <div id="doc-viewer">
      <div class="back key">← Back</div>
      <iframe src="" id="docFrame"></iframe>
    </div>
  </div>

<script>
  // STEPS
  const steps = [
    'Initializing Secure Vault...', 'Authenticating Protocols...', 'Decrypting Stored Files...',
    'Validating System Integrity...', 'Fetching Data...', 'Scanning User Agent...', 'Establishing Secure Channel...'
  ];
  let idx=0; const loadText=document.getElementById('loadText');
  function showNext(){
    if(idx<steps.length){ loadText.innerHTML+=steps[idx++]+'<br>'; setTimeout(showNext,800+Math.random()*400);
    } else { loadText.innerHTML+='<br>System Online. Proceed with authentication.<br>'; setTimeout(()=>{ swap('loader','passcode'); initPass(); },1000); }
  }
  showNext();

  // UTIL SWAP
  function swap(hideId, showId){ document.getElementById(hideId).style.display='none'; document.getElementById(showId).style.display='block'; }

  // PASSCODE
  const correctCode='210866';
  function initPass(){ const scr=document.getElementById('passcode'), keys=scr.querySelector('.keys'), inp=document.getElementById('codeInput');
    for(let n=1;n<=9;n++){ let b=document.createElement('div'); b.className='key'; b.textContent=n; b.onclick=()=>inp.value+=n; keys.appendChild(b);}  
    ['0','T','X'].forEach(c=>{ let b=document.createElement('div'); b.className='key'; b.textContent=c;
      if(c==='T') b.onclick=()=>checkPass();
      else if(c==='X') b.onclick=()=>{ inp.value=''; msg(''); };
      else b.onclick=()=>inp.value+=c;
      keys.appendChild(b);
    });
  }
  function msg(txt){ document.getElementById('passMsg').textContent=txt; }
  function checkPass(){ const inp=document.getElementById('codeInput'); if(inp.value===correctCode){ msg('Passcode accepted.'); setTimeout(()=>{ swap('passcode','login'); initLogin(); },1000);} else{ msg('Incorrect passcode. Access denied.'); setTimeout(()=>{ msg(''); inp.value=''; },1000);} }

  // LOGIN
  const validUser='WilliamFD', validPass='13267709';
  function initLogin(){ const scr=document.getElementById('login'), keys=scr.querySelector('.keys');
    let loginBtn=document.createElement('div'); loginBtn.className='key'; loginBtn.textContent='L'; loginBtn.onclick=checkLogin;
    let clearBtn=document.createElement('div'); clearBtn.className='key'; clearBtn.textContent='C'; clearBtn.onclick=()=>{document.getElementById('userInput').value=''; document.getElementById('passInput').value=''; document.getElementById('loginMsg').textContent='';};
    keys.appendChild(loginBtn); keys.appendChild(clearBtn);
  }
  function checkLogin(){ const u=document.getElementById('userInput').value, p=document.getElementById('passInput').value, msg=document.getElementById('loginMsg');
    if(u===validUser && p===validPass){ msg.textContent='Login successful.'; setTimeout(()=>{ swap('login','library'); initLibrary(); },1000);
    } else { msg.textContent='Unavailable account. Access denied.'; setTimeout(()=>{ msg.textContent=''; },1000); } }

  // LIBRARY
  const docs=[
    {title:'Declassified CIA Report',date:'1973',url:'https://www.foia.cia.gov/sample.pdf'},
    {title:'JFK Select Committee Report',date:'1979',url:'https://www.archives.gov/files/research/jfk/select-committee-report.pdf'},
    {title:'NSA Declassified Documents',date:'2005',url:'https://www.nsa.gov/portals/75/documents/news-features/declassified-documents.pdf'}
  ];
  function initLibrary(){ const list=document.getElementById('doc-list'); docs.forEach((d,i)=>{ let b=document.createElement('div'); b.className='doc-btn'; b.textContent=`${d.title} (${d.date})`; b.onclick=()=>openDoc(i); list.appendChild(b); }); }
  function openDoc(i){ document.getElementById('doc-list').style.display='none'; let v=document.getElementById('doc-viewer'); v.style.display='block'; document.getElementById('docFrame').src=docs[i].url; v.querySelector('.back').onclick=()=>{ v.style.display='none'; document.getElementById('doc-list').style.display='block'; }; }
</script>
</body>
</html>`);
};
