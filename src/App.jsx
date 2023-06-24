import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

  const [quote,setQuote] = useState({});
  const [quoteState,setQuoteState] = useState(false);
  const [color,setColor] = useState(colors[Math.floor(Math.random()*colors.length)])



  useEffect(()=>{
    getQuote();
  },[])

  function getQuote() {

    setQuoteState(false);
    setColor(colors[Math.floor(Math.random()*colors.length)]);

    setTimeout(()=>{

      fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(response=>response.json())
        .then(data=>setQuote(data.quotes[Math.floor(Math.random()*data.quotes.length)]))
        .then(setQuoteState(true))
        .catch(error=>alert(error));

    }) 

  }

  return (
    <main className='p-2 text-center d-flex flex-column justify-content-center align-items-center h-100 gap-2' style={{backgroundColor:color}} >
      {quoteState&&<section id='quote-box' className='p-5 col-md-7 d-flex flex-column align-items-center bg-white rounded-1 gap-4'>
        <p id='text' className='fs-2 fw-medium mainFont' style={{color:color}}  ><i className="bi bi-quote fs-1" />{quote.quote}</p>
        <div id='author' className='fs-5 align-self-end mainFont' style={{color:color}} >- {quote.author}</div>
        <section className='w-100 d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2' >
            <a id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent('"' + quote.quote + '" ' + quote.author)}`} target="_blank" rel="noreferrer" className="rounded-1 btn-w btn-h btn-hover d-flex justify-content-center align-items-center" style={{backgroundColor:color}} ><i className={`bi bi-twitter fs-5 text-white`}/></a>
            <a id="tumblr-quote" href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=
      ${encodeURIComponent(quote.author)}&content=${encodeURIComponent(quote.quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} target="_blank" rel="noreferrer" className="rounded-1 btn-w btn-h btn-hover d-flex justify-content-center align-items-center" style={{backgroundColor:color}} ><span className='tumblrIcon'/></a>
          </div>
          <button id='new-quote' onClick={getQuote} className='btn btn-hover btn-unstyled text-white rounded-1' style={{backgroundColor:color}} >New quote</button>
        </section>
      </section>}
      <div className='text-white' >Challenge by <a className='text-white hover-full-opacity'  href='https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-random-quote-machine' target="_blank" rel="noreferrer"  >freeCodeCamp<span /></a></div>
    </main>
  )
}

export default App
