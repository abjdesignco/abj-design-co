/* Apply the saved/system theme before CSS paints. */
(()=>{try{const s=localStorage.getItem('abj-theme');const d=matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(s==='dark'||s==='light')?s:(d?'dark':'light')}catch(e){}})();
