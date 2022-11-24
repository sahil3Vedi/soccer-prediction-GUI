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
}

const Results: NextPage = () => {
    return (
        <div>
            <Head>
                <title>PlayerOne - Results</title>
                <meta name="description" content="Sports Analysis by Data Professionals" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
  
            <Navbar/>
            <div className="page_container">
                <h1><b>Results</b></h1>
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
  
export default Results