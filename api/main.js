module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>US Federal Document Archive</title>
  <style>
    /* Full screen black background */
    html, body { margin:0; padding:0; width:100%; height:100%; background:#000; color:#0f0; font-family:monospace; }
    /* Loader container */
    #loader { position:fixed; top:0; left:0; width:100%; height:100%; overflow-y:auto; padding:20px; }
    #loader div { margin-bottom:5px; }
    /* Centered modals */
    .modal { display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#000; border:2px solid #0f0; padding:20px; width:80vw; max-width:400px; }
    .modal h2 { margin-bottom:15px; }
    .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:5px; }
    .btn { background:#000; border:2px solid #0f0; color:#0f0; padding:10px; text-align:center; cursor:pointer; }
    input { width:100%; padding:8px; margin:5px 0; background:#000; border:2px solid #0f0; color:#0f0; }
    /* Library and viewer */
    #library, #docViewer { display:none; position:fixed; top:5%; left:5%; right:5%; bottom:5%; background:#000; overflow:auto; padding:20px; border:2px solid #0f0; }
    #library li { margin:10px 0; cursor:pointer; }
    #back { margin-bottom:10px; cursor:pointer; }
  </style>
</head>
<body>
  <!-- Loader -->
  <div id="loader"></div>

  <!-- Passcode Modal -->
  <div id="passcode" class="modal">
    <h2>Enter Passcode</h2>
    <input id="code" placeholder="Passcode" readonly />
    <div class="grid" id="passGrid"></div>
    <div id="passMsg"></div>
  </div>

  <!-- Login Modal -->
  <div id="login" class="modal">
    <h2>Login</h2>
    <input id="user" placeholder="Username" />
    <input id="pass" type="password" placeholder="Password" />
    <div class="btn" id="loginBtn">Login</div>
    <div id="loginMsg"></div>
  </div>

  <!-- Library -->
  <div id="library">
    <h2>Document Archive</h2>
    <ul id="list"></ul>
  </div>

  <!-- Document Viewer -->
  <div id="docViewer">
    <div id="back" class="btn">← Back</div>
    <pre id="content"></pre>
  </div>

  <script>
    // Steps to load
    const steps = [
      'Initializing Secure Vault...',
      'Authenticating...',
      'Decrypting Files...',
      'Validating...',
      'Fetching Data...',
      'Finalizing...'
    ];
    const loader = document.getElementById('loader');
    let i = 0;
    function step() {
      if (i < steps.length) {
        const d = document.createElement('div');
        d.textContent = steps[i++];
        loader.appendChild(d);
        setTimeout(step, 700);
      } else {
        setTimeout(() => initPasscode(), 500);
      }
    }
    step();

    // Passcode
    const PASS='210866';
    function initPasscode() {
      loader.style.display='none';
      const modal = document.getElementById('passcode');
      modal.style.display='block';
      const grid = document.getElementById('passGrid');
      ['1','2','3','4','5','6','7','8','9','0','C','OK'].forEach(x=>{
        const b=document.createElement('div');b.className='btn';b.textContent=x;
        b.onclick=()=>{
          const inp=document.getElementById('code');
          if(x==='C') inp.value='';
          else if(x==='OK') verifyPass();
          else inp.value+=x;
        };
        grid.appendChild(b);
      });
    }
    function verifyPass() {
      const val = document.getElementById('code').value;
      const msg = document.getElementById('passMsg');
      if(val===PASS) {
        msg.textContent='Access Granted';
        setTimeout(()=>{
          document.getElementById('passcode').style.display='none';
          initLogin();
        },500);
      } else msg.textContent='Denied';
    }

    // Login
    function initLogin() {
      const modal = document.getElementById('login');
      modal.style.display='block';
      document.getElementById('loginBtn').onclick = ()=>{
        const u=document.getElementById('user').value;
        const p=document.getElementById('pass').value;
        const msg=document.getElementById('loginMsg');
        if(u==='WilliamFD' && p==='13267709') {
          msg.textContent='Welcome';
          setTimeout(()=>{
            modal.style.display='none';
            showLibrary();
          },500);
        } else msg.textContent='Invalid';
      };
    }

    // Library
    const docs = [
      { title: 'Declassified CIA Report (1973)', content: `REPORT OF THE CENTRAL INTELLIGENCE AGENCY, July 1973

This declassified report covers operations and findings from early Cold War intelligence activities...

[Full CIA Report Text Here]`},
      { title: 'JFK Select Committee Report (1979)', content: `REPORT OF THE SELECT COMMITTEE ON ASSASSINATIONS, 1979

The Committee investigates the circumstances surrounding the murders of President Kennedy and Dr. Martin Luther King Jr.Â 

[Full JFK Committee Report Here]`},
      { title: 'NSA Declassified Documents (2005)', content: `NATIONAL SECURITY AGENCY DECLASSIFIED, 2005

Contains records of electronic surveillance and cryptographic analysis from the Vietnam era.

[Full NSA Documents Text Here]`}
    ];
    function showLibrary() {
      const lib = document.getElementById('library');
      lib.style.display='block';
      const list = document.getElementById('list');
      list.innerHTML = ''; // clear to prevent duplicates
      docs.forEach((d,idx)=>{
        const li=document.createElement('li');
        li.textContent=d.title;
        li.onclick=()=>openDoc(idx);
        list.appendChild(li);
      });
    };
    }
  </script>
</body>
</html>`);
};
