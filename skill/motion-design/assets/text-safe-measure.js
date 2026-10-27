(function(){
  const FRAME = {w:1920, h:1080};
  const SAFE  = {l:80, t:48, r:1920-80, b:1080-48};
  function run(){
    const out = [];
    const fonts = [];
    try {
      document.fonts.forEach(f => fonts.push(f.family + " " + f.weight + " " + f.status));
    } catch(e){}
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    const seen = new Set();
    function label(el){
      const c = (el.className && typeof el.className === 'string') ? el.className : '';
      const t = (el.textContent||'').replace(/\s+/g,' ').trim().slice(0,26);
      return el.tagName.toLowerCase() + (c?('.'+c.split(/\s+/).join('.')):'') + (t?(' «'+t+'»'):'');
    }
    let el;
    while ((el = walker.nextNode())) {
      const ownText = Array.from(el.childNodes).filter(n=>n.nodeType===3)
        .map(n=>n.textContent).join('').replace(/\s+/g,' ').trim();
      if (!ownText) continue;
      // 量「文字墨水」的實際範圍，用 Range 而不是容器 rect，才不會把置中容器誤判成超出
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      range.detach && range.detach();
      if (r.width === 0 && r.height === 0) continue;
      const key = label(el)+'|'+Math.round(r.left)+','+Math.round(r.top);
      if (seen.has(key)) continue; seen.add(key);
      const cs = getComputedStyle(el);
      const lines = Math.round(r.height / (parseFloat(cs.lineHeight) || parseFloat(cs.fontSize)*1.2));
      const over = [];
      if (r.left   < SAFE.l) over.push('左 '+Math.round(SAFE.l-r.left));
      if (r.top    < SAFE.t) over.push('上 '+Math.round(SAFE.t-r.top));
      if (r.right  > SAFE.r) over.push('右 '+Math.round(r.right-SAFE.r));
      if (r.bottom > SAFE.b) over.push('下 '+Math.round(r.bottom-SAFE.b));
      const hard = (r.left<0)||(r.top<0)||(r.right>FRAME.w)||(r.bottom>FRAME.h);
      if (over.length) out.push({el:label(el), rect:[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)],
                                 font:cs.fontFamily.split(',')[0].replace(/"/g,''), size:cs.fontSize, lines, over, hard});
    }
    const pre = document.createElement('pre');
    pre.id = 'MEASURE_REPORT';
    pre.textContent = JSON.stringify({fonts: fonts, issues: out});
    document.body.appendChild(pre);
  }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(run); } else { run(); }
})();
