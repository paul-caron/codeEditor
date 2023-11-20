import "./CodeEditor.css";
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-clojure';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-r';


function CodeEditor() {
  const [source, setSource] = useState("");
  const [language, setLanguage] = useState("c");
  const [codeClass, setCodeClass] = useState(`codeHighlighting language-${language}`) ;
  const [lineNumbers, setLineNumbers] = useState("1");
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [prismCssUrl, setPrismCssUrl] = useState("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css") ;


  useEffect(() => {
    const oldCss = document.querySelector("#prismCss") ;
    if(oldCss) oldCss.remove() ;

    const style = document.createElement('style') ;
    style.id = "prismCss" ;
    document.head.appendChild(style) ;
    
    const updateCss = async () => {
      const styleContent = fetch(prismCssUrl) ;
      styleContent.then( r => r.text() )
                  .then( text => style.innerText = text ) ;
    } ;
    updateCss() ;
  }, [prismCssUrl]);

  useEffect(() => {
    const ln = document.querySelector(".lineNumbers") ; 
    if(ln) ln.scrollTop = scrollTop ;
    const ch = document.querySelector(".codeHighlighting code") ; 
    if(ch) ch.scrollTop = scrollTop ;
    if(ch) ch.scrollLeft = scrollLeft ;
  }, [scrollTop, scrollLeft]) ;

  useEffect(() => {
    Prism.highlightAll() ;
    const el = document.querySelector('pre') ;
    if(el)
      el.className = codeClass ;
    Prism.highlightAll() ;
  }, [source, codeClass]);

  const textInput = (event: any) => {
    event.preventDefault();
    let text = event.target.value;
    if(text[text.length-1] === "\n") {
      text += " ";
    }
    setSource(text) ;
    let lnContent = "" ;
    let count = text.split('\n').length ; 
    for(let lineN=1;count--;lineN++)
      lnContent += lineN + '\n' ;
    setLineNumbers(lnContent);
  }

  const languageInput = (event: any) => {
    event.preventDefault() ;
    setLanguage(event.target.value) ;
    setCodeClass(`codeHighlighting language-${event.target.value}`);
  }

  const syncScroll = (event: any) => {
    setScrollTop(event.target.scrollTop) ;
    setScrollLeft(event.target.scrollLeft) ;
  }

  const updatePrismCss = (event: any) => {
    setPrismCssUrl(event.target.value) ;
  }

  return (
  <>
    <div className="codeEditor" >
      <textarea style={{width:"100%",height:"100%"}}
                className="textEditing"
                spellCheck={ false }                
                onScroll={ syncScroll }
                onInput={ textInput }
                 >
      </textarea>

      <pre className="codeHightlighting" ><code className={`language-${language}`} >{ source }</code></pre>
      <pre className="lineNumbers" >{ lineNumbers }</pre>

    </div>
    <br />
    <select name="language-select" id="language-select" onInput={ languageInput } >
      <option value="c">C</option>                                             
      <option value="clojure">Clojure</option>
      <option value="cpp">CPP</option>
      <option value="go">Go</option>
      <option value="java">Java</option>
      <option value="javascript">Javascript</option>
      <option value="python">Python</option>
      <option value="r">R</option>
      <option value="rust">Rust</option>
      <option value="shell-session">Shell</option>
    </select>
    <br />
    <select name="theme-select" id="theme-select" onInput={ updatePrismCss }>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css">Prism</option>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-coy.min.css">Coy</option>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-dark.min.css">Dark</option>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-funky.min.css">Funky</option>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css">Okaidia</option>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">Tomorrow</option>
      <option value="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-twilight.min.css">Twilight</option>
    </select>
  </>
  );
}

export default CodeEditor;
