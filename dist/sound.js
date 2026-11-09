/* Sound for the portfolio: an original 8-bit loop (synthesised with Web Audio) + click sounds.
   The ordinary click ('tap') and the select/toggle click ('select') are samples from maskedsound's free 8-bit SFX pack
   (https://maskedsound.itch.io/8-bit-sfx-pack, free for commercial use, credit appreciated) in audio/sfx/; every other
   sound is synthesised, and the synth versions of tap/select are the fallback until the samples have loaded.
   On by default. The loop tries to start on page load; browsers only allow that for some visitors (autoplay settings,
   Chrome's media engagement), so otherwise it starts on the first tap / click / key press. The header speaker button
   turns it off and the choice is remembered.
   Pages call SFX.play(name) for special moments; ordinary clicks are mapped below (or via data-sfx="name"). */
(function(){
  var AC=window.AudioContext||window.webkitAudioContext;
  var SRC=(document.currentScript&&document.currentScript.src)||'';
  var SAMPLES={laser:['laser-1-v1','laser-1-v2'],hurt:['hurt-1-v1','hurt-1-v2'],coin:['coin-1-v1','coin-1-v2','coin-2-v1']};
  var bank=null; // name → [AudioBuffer], peak-normalised; null until loaded
  var live=false,ctx=null,master,musicBus,sfxBus,noiseBuf,on=false,timer=null,nextT=0,step=0;
  on=true;try{on=localStorage.getItem('sound')!=='off'}catch(e){}

  function midi(m){return 440*Math.pow(2,(m-69)/12)}
  function ensure(){
    if(ctx)return true;
    if(!AC)return false;
    ctx=new AC();
    master=ctx.createGain();master.gain.value=0.9;master.connect(ctx.destination);
    musicBus=ctx.createGain();musicBus.gain.value=0;musicBus.connect(master);
    sfxBus=ctx.createGain();sfxBus.gain.value=0.8;sfxBus.connect(master);
    noiseBuf=ctx.createBuffer(1,ctx.sampleRate*0.5,ctx.sampleRate);
    var d=noiseBuf.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    loadSamples();
    return true;
  }

  function loadSamples(){
    if(bank!==null||!SRC)return;
    bank={};
    Object.keys(SAMPLES).forEach(function(k){
      Promise.all(SAMPLES[k].map(function(n){
        return fetch(new URL('audio/sfx/'+n+'.wav',SRC)).then(function(r){
          var ct = r.headers.get('content-type') || '';
          if (!r.ok || ct.indexOf('text/html') !== -1 || ct.indexOf('audio') === -1) {
            return null;
          }
          return r.arrayBuffer();
        }).then(function(b){
          if (!b) return null;
          return new Promise(function(ok,no){ctx.decodeAudioData(b,ok,no)}).catch(function(){ return null; });
        }).then(function(buf){
          if (!buf) return null;
          var d=buf.getChannelData(0),pk=0,i;for(i=0;i<d.length;i++)pk=Math.max(pk,Math.abs(d[i]));
          if(pk>0)for(i=0;i<d.length;i++)d[i]/=pk;
          return buf;
        }).catch(function(){ return null; });
      })).then(function(list){bank[k]=list.filter(Boolean)}).catch(function(){});
    });
  }
  // one sample from the bank (random variation), slightly detuned so repeated clicks don't sound identical
  function shot(k,t,gain,rate){
    var list=bank&&bank[k];if(!list||!list.length)return false;
    var s=ctx.createBufferSource(),g=ctx.createGain();
    s.buffer=list[Math.floor(Math.random()*list.length)];s.playbackRate.value=rate*(0.98+Math.random()*0.04);
    g.gain.value=gain;s.connect(g);g.connect(sfxBus);s.start(t);return true;
  }

  // one note: oscillator → (optional lowpass) → envelope → bus
  function voice(bus,type,f0,f1,t,dur,peak,cut){
    var o=ctx.createOscillator(),g=ctx.createGain(),out=g;
    o.type=type;o.frequency.setValueAtTime(f0,t);
    if(f1&&f1!==f0)o.frequency.exponentialRampToValueAtTime(f1,t+dur);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+0.006);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    if(cut){var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=cut;o.connect(lp);lp.connect(g)}else o.connect(g);
    out.connect(bus);o.start(t);o.stop(t+dur+0.02);
  }
  function noise(bus,t,dur,peak,hp,lp){
    var s=ctx.createBufferSource(),g=ctx.createGain(),f=ctx.createBiquadFilter();
    s.buffer=noiseBuf;f.type=hp?'highpass':'lowpass';f.frequency.value=hp||lp||4000;
    g.gain.setValueAtTime(peak,t);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(bus);s.start(t);s.stop(t+dur+0.02);
  }

  /* ---- the loop: 8 bars, 120 bpm, Am · F · C · G — square arpeggio, triangle bass, soft hats, a melody in the second half ---- */
  var EIGHTH=0.25;
  var CH=[[57,60,64,69],[53,57,60,65],[48,52,55,60],[55,59,62,67]],BASS=[45,41,48,43],ARP=[0,1,2,3,2,1,0,1];
  var MEL=[76,0,74,72,0,69,0,0, 72,0,69,0,67,69,0,0, 76,0,79,76,0,74,72,0, 74,0,0,71,0,67,0,0];
  function scheduleStep(t){
    var bar=Math.floor(step/8)%8,e=step%8,ch=CH[bar%4];
    voice(musicBus,'square',midi(ch[ARP[e]]+12),0,t,EIGHTH*0.9,0.035,2200);
    if(e===0||e===4)voice(musicBus,'triangle',midi(BASS[bar%4]),0,t,EIGHTH*1.9,0.16);
    if(e%2===1)noise(musicBus,t,0.035,0.035,7000);
    if(bar>=4){var m=MEL[(bar-4)*8+e];if(m)voice(musicBus,'square',midi(m),0,t,EIGHTH*1.6,0.03,3200)}
    step=(step+1)%64;
  }
  function pump(){while(nextT<ctx.currentTime+0.25){scheduleStep(nextT);nextT+=EIGHTH}}

  /* ---- iOS: unlock inside a gesture, and get past the Ring/Silent switch ---- */
  var keep=null; // a looping silent <audio>: media elements ignore the silent switch and take Web Audio with them (older iOS)
  function unlock(){
    if(!ensure())return;
    // Safari 17+: declare this as media playback, so the silent switch doesn't mute it
    try{if(navigator.audioSession&&navigator.audioSession.type!=='playback')navigator.audioSession.type='playback'}catch(e){}
    if(ctx.state!=='running')ctx.resume();
    // older iOS only unlocks Web Audio once a source is started inside the gesture
    try{var s=ctx.createBufferSource();s.buffer=ctx.createBuffer(1,1,22050);s.connect(ctx.destination);s.start(0)}catch(e){}
    if(!navigator.audioSession&&SRC&&/iP(hone|ad|od)|Macintosh/.test(navigator.userAgent)&&'ontouchend' in document){
      if(!keep){keep=new Audio(new URL('audio/silence.wav',SRC).href);keep.loop=true;keep.setAttribute('playsinline','');keep.setAttribute('x-webkit-airplay','deny')}
      if(keep.paused)keep.play().catch(function(){});
    }
  }
  function musicStart(){
    if(!ensure())return;
    if(ctx.state!=='running')ctx.resume();
    if(!timer){nextT=ctx.currentTime+0.08;timer=setInterval(pump,40);pump()}
    if(ctx.state==='running'){live=true;render()}
    else ctx.resume().then(function(){live=ctx.state==='running';render()});
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setTargetAtTime(0.55,ctx.currentTime,0.6);
  }
  function musicStop(){
    if(!ctx||!timer)return;
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setTargetAtTime(0,ctx.currentTime,0.15);
    live=false;var tm=timer;timer=null;setTimeout(function(){clearInterval(tm)},500); // let the last notes fade out
    if(keep&&!keep.paused)keep.pause();
    render();
  }

  /* ---- click sounds ---- */
  function arp(notes,gap,type,peak,dur){var t=ctx.currentTime;notes.forEach(function(n,i){voice(sfxBus,type||'square',midi(n),0,t+i*gap,dur||gap*1.6,peak||0.05,3400)})}
  var FX={
    tap:function(t){
      if(shot('laser',t,0.12,1)){shot('hurt',t+0.012,0.035,1.15);return}
      voice(sfxBus,'square',660,990,t,0.05,0.045,3000)},
    select:function(t){
      if(shot('coin',t,0.1,1))return;
      voice(sfxBus,'triangle',1250,1250,t,0.035,0.06)},
    coin:function(t){voice(sfxBus,'square',988,988,t,0.07,0.045,4000);voice(sfxBus,'square',1319,1319,t+0.07,0.22,0.045,4000)},
    open:function(){arp([72,79,84],0.045,'triangle',0.07)},
    close:function(t){voice(sfxBus,'triangle',784,392,t,0.11,0.06)},
    theme:function(t){noise(sfxBus,t,0.28,0.05,0,2400);arp([60,64,67,72],0.05,'triangle',0.06)},
    copy:function(){arp([84,88,91],0.035,'square',0.04)},
    powerup:function(){arp([60,64,67,72,76,79,84,88],0.04,'square',0.035,0.07)},
    place:function(t,o){voice(sfxBus,'triangle',midi(72+((o&&o.i)||0)%12),0,t,0.06,0.05)},
    drop:function(t){voice(sfxBus,'square',330,220,t,0.07,0.045,2400)},
    pin:function(t){voice(sfxBus,'triangle',880,1320,t,0.08,0.06)},
    reply:function(){arp([76,81],0.07,'triangle',0.06,0.14)},
    jump:function(t){voice(sfxBus,'square',300,720,t,0.13,0.04,2600)},
    thud:function(t){voice(sfxBus,'triangle',170,70,t,0.12,0.12);noise(sfxBus,t,0.05,0.03,0,900)},
    sparkle:function(){arp([79,84,88,91,96],0.05,'triangle',0.045,0.12)},
    on:function(){arp([67,72,76,79],0.06,'square',0.04,0.1)},
    off:function(){arp([79,72,67],0.06,'square',0.035,0.1)}
  };
  function play(name,o){
    if(!on||!FX[name]||!ensure())return;
    if(ctx.state!=='running')ctx.resume();
    FX[name](ctx.currentTime+0.005,o);
  }

  /* ---- toggle ---- */
  function render(){
    document.documentElement.classList.toggle('snd-wait',on&&!live);
    document.querySelectorAll('[data-sound-toggle]').forEach(function(b){
      b.setAttribute('aria-pressed',on);b.classList.toggle('playing',on);b.classList.toggle('waiting',on&&!live);
      b.setAttribute('aria-label',on?'Turn sound off':'Turn sound on');
      b.setAttribute('data-cursor-label',on?'sound off':'sound on ♪');
    });
  }
  function setOn(v){
    on=v;try{localStorage.setItem('sound',v?'on':'off')}catch(e){}
    if(v){unlock();musicStart();play('on')}else{play('off');musicStop()}
    render();
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-sound-toggle]');
    if(b){setOn(!on);return}
    if(!on)return;
    var t=e.target.closest&&e.target.closest('[data-sfx],a,button,[role=button],.chip,summary');
    if(!t)return;
    var n=t.getAttribute('data-sfx');
    if(n==='none')return;
    if(!n){
      if(t.matches('.card,.post,.xp,.next'))n='coin';
      else if(t.matches('[data-copy]'))n='copy';
      else if(t.matches('#themeBtn'))n='theme';
      else if(t.matches('[data-tool],.tabs button,.smenu button,.chip'))n='select';
      else if(t.matches('[data-pal],.frame'))n='open';
      else n='tap';
    }
    play(n);
  },true);
  // browsers usually only allow audio after a gesture: try on load, then on every interaction until the loop is actually running
  // (iOS unlocks audio on touchend/click rather than pointerdown, so listen to all of them)
  var WAKE=['pointerdown','pointerup','touchend','click','keydown'];
  // iOS only fires click (the one tap it reliably treats as a gesture) on elements it thinks are clickable, so tapping plain
  // text did nothing. While the loop is waiting, make the whole page "clickable" on touch screens, without the grey tap flash.
  var ws=document.createElement('style');
  ws.textContent='@media (hover:none){html.snd-wait,html.snd-wait body{cursor:pointer;-webkit-tap-highlight-color:transparent}}';
  (document.head||document.documentElement).appendChild(ws);
  // stays attached: after a phone lock or app switch iOS may need another gesture to resume
  function wake(){if(on&&!live){unlock();musicStart()}}
  WAKE.forEach(function(n){addEventListener(n,wake,true)});
  if(on)musicStart();

  document.addEventListener('visibilitychange',function(){if(!on||!ctx)return;if(document.hidden)musicStop();else{unlock();musicStart()}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();

  window.SFX={play:play,isOn:function(){return on}};
})();
