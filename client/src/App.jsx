import { useState } from 'react'
import styles from './index.module.css'
import sqldatabase from './assets/sql-database.svg'


function App() {
  const [queryDescription, setQueryDescription] = useState('')
  const [sqlQuery, setSqlQuery ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const fetchedSqlQuery = await generateQuery()
    setSqlQuery(fetchedSqlQuery)
    console.log("return sqlQuery: ", fetchedSqlQuery)
  }

  const generateQuery = async () => {
    const res = await fetch("http://localhost:3008/generatesql",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    const data = await res.json();
    return data.response.trim()
  }
  return (
    <main className={styles.main}>
      <img src={sqldatabase} alt="" className={styles.icon} />
      <h3>SQL Powered By AI</h3>

      <form onSubmit={onSubmit}>
        <input 
          type="text"
          name="query-description"
          placeholder='Query Description Here..'
          onChange={(e)=> setQueryDescription(e.target.value)}
        />
        <input type="submit" value="Generate Query" />
      </form>

      <pre>{sqlQuery}</pre>
    </main>
  )
}

export default App
