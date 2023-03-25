import { useEffect, useState } from 'react'

import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

// const CAT_ENDPOINT_GIF = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`;



function App() {
  const [fact, setFact] = useState("Initial fact about cats");
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data;
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return;
    
    const threeFirstWords = fact.split(" ", 3).join(" ");
    console.log(threeFirstWords);

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response;
        setImageUrl(url);
      })
  },[fact])

  return (
    <main className="App">
      <h1>Cat GIFs</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img 
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} 
          alt={`Image extracted using the first three words for ${fact}`} 
          />}
      </section>
      
    </main>
  )
}

export default App
