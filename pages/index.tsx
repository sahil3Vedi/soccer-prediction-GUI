// Next Dependencies
import type { NextPage } from 'next'
import Head from 'next/head'
// Ant Design
// Components
import Navbar from '../components/navbar'

// Styles
const upcomingStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "20px",
}

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PlayerOne Sports Analytics</title>
        <meta name="description" content="Sports Analysis by Data Professionals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>
      <div className="page_container">
        <h1><b>Live</b></h1>
        <div style={upcomingStyle}>
          <div><h2><b>🇬🇧 England</b></h2></div>
          <div><h2><b>🇫🇷 France</b></h2></div>
          <div><h2><b>🇩🇪 Germany</b></h2></div>
          <div><h2><b>🇪🇸 Spain</b></h2></div>
          <div><h2><b>🇮🇹 Italy</b></h2></div>
          <div><h2><b>🇳🇱 Netherlands</b></h2></div>
          <div><h2><b>🇩🇰 Denmark</b></h2></div>
        </div>
        <h1><b>Today</b></h1>
        <div style={upcomingStyle}>
          <div><h2><b>🇬🇧 England</b></h2></div>
          <div><h2><b>🇫🇷 France</b></h2></div>
          <div><h2><b>🇩🇪 Germany</b></h2></div>
          <div><h2><b>🇪🇸 Spain</b></h2></div>
          <div><h2><b>🇮🇹 Italy</b></h2></div>
          <div><h2><b>🇳🇱 Netherlands</b></h2></div>
          <div><h2><b>🇩🇰 Denmark</b></h2></div>
        </div>
        <h1><b>Up Next</b></h1>
        <div style={upcomingStyle}>
          <div><h2><b>🇬🇧 England</b></h2></div>
          <div><h2><b>🇫🇷 France</b></h2></div>
          <div><h2><b>🇩🇪 Germany</b></h2></div>
          <div><h2><b>🇪🇸 Spain</b></h2></div>
          <div><h2><b>🇮🇹 Italy</b></h2></div>
          <div><h2><b>🇳🇱 Netherlands</b></h2></div>
          <div><h2><b>🇩🇰 Denmark</b></h2></div>
        </div>
      </div>

  
    </div>
  )
}

export default Home