// Next Dependencies
import type { NextPage } from 'next'
import Head from 'next/head'
// Ant Design
// Components
import Navbar from '../components/navbar'
// moment
import moment from 'moment'
// England Data
import { fixtures as fx_England } from '../fixtures/England/epl-2022.json'
import { results as res_England_20} from '../results/England/epl-2020.json'
import { results as res_England_21} from '../results/England/epl-2021.json'
import { results as res_England_22} from '../results/England/epl-2022.json'
// Spain Data
import { results as fx_Spain } from '../results/Spain/spl-2022.json'
import { results as res_Spain_20 } from '../results/Spain/spl-2020.json'
import { results as res_Spain_21 } from '../results/Spain/spl-2021.json'
import { results as res_Spain_22 } from '../results/Spain/spl-2022.json'
// Germany Data
import { results as fx_Germany } from '../results/Germany/gpl-2022.json'
import { results as res_Germany_20 } from '../results/Germany/gpl-2020.json'
import { results as res_Germany_21 } from '../results/Germany/gpl-2021.json'
import { results as res_Germany_22 } from '../results/Germany/gpl-2022.json'
// Italy Data
import { results as fx_Italy } from '../results/Italy/ipl-2022.json'
import { results as res_Italy_20 } from '../results/Italy/ipl-2020.json'
import { results as res_Italy_21 } from '../results/Italy/ipl-2021.json'
import { results as res_Italy_22 } from '../results/Italy/ipl-2022.json'
// France Data
import { results as fx_France } from '../results/France/fpl-2022.json'
import { results as res_France_20} from '../results/France/fpl-2020.json'
import { results as res_France_21} from '../results/France/fpl-2021.json'
import { results as res_France_22} from '../results/France/fpl-2022.json'

// Styles
import FixtureStyles from '../styles/fixture.module.scss';

// Styles
const upcomingStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    columnGap: "20px",
    rowGap: "10px"
}

const calculateSum = (arr: any) => {
    return arr.reduce((total:any, current:any) => {
        return total + current;
    }, 0);
}

const calculateAverage = (arr: any) => {
    const sum = arr.reduce((total:any, current:any) => {
        return total + current;
    }, 0);
    return sum/arr.length
}

const fact = (k: number) => {
    let fact = k
    let current = k-1
    while (current > 1){
        fact = fact*current
        current = current - 1
    }
    return fact
}

const poisson = (k: number, lambda: number) => {
    const e = 2.718281828
    const exp = (lambda===0) ? 1 : Math.pow(e, -lambda)
    const lambdaPower = Math.pow(lambda,k)
    const num = exp * lambdaPower
    const denom = (k===0) ? 1 : fact(k)
    return (num/denom)
}

const getPrediction = (home: string, away: string, res: any) => {
    const total_home_goals = calculateSum(res.map((r: any)=>r.HomeTeamScore))
    const total_away_goals = calculateSum(res.map((r: any)=>r.HomeTeamScore))
    const total_matches = res.length
    const avg_home_goals = total_home_goals / total_matches
    const avg_away_goals = total_away_goals / total_matches
    let home_found = 0
    let home_performance = []
    let away_found = 0
    let away_performance = []
    for (var i in res){
        const result = res[i]
        if (result.HomeTeam === home){
            home_found += 1
            home_performance.push([result.HomeTeamScore, result.AwayTeamScore])
        }
        if (result.AwayTeam === away) {
            away_found += 1
            away_performance.push([result.HomeTeamScore, result.AwayTeamScore])
        }
    }
    
    if ((home_found < 31) || (away_found < 31)){
        return {
            "home": "-",
            "away": "-",
            "draw": "-",
            "homeOdds": "-",
            "awayOdds": "-",
            "drawOdds": "-",
            "homeExpected": "-",
            "awayExpected": "-"
        }
    }
    const avg_home_scored = calculateAverage(home_performance.map((r)=>r[0]))
    const avg_away_scored = calculateAverage(away_performance.map((r)=>r[1]))
    const avg_home_conceded = calculateAverage(home_performance.map((r)=>r[1]))
    const avg_away_conceded = calculateAverage(away_performance.map((r)=>r[0]))

    const home_attack_strength = avg_home_scored / avg_home_goals
    const away_attack_strength = avg_away_scored / avg_away_goals
    const home_defense_strength = avg_home_conceded / avg_away_goals
    const away_defense_strength = avg_away_conceded / avg_home_goals

    let home_expected = home_attack_strength * away_defense_strength * avg_home_goals
    let away_expected = away_attack_strength * home_defense_strength * avg_away_goals

    const num_goals = [0,1,2,3,4,5]
    const home_dist = num_goals.map((g)=>poisson(g, home_expected))
    const away_dist = num_goals.map((g)=>poisson(g, away_expected))

    let home_prob = 0
    let away_prob = 0
    let draw_prob = 0

    for (var h in num_goals){
        for (var a in num_goals){
            const outcome = home_dist[h]*away_dist[a]
            if (h > a){
                home_prob += outcome
            } else if (a > h) {
                away_prob += outcome
            } else {
                draw_prob += outcome
            }
        }
    }

    const home_odds = home_prob
    const away_odds = away_prob
    const draw_odds = draw_prob
    return {
        "home": home_odds.toString().slice(0,6),
        "away": away_odds.toString().slice(0,6),
        "draw": draw_odds.toString().slice(0,6),
        "homeOdds": (1/home_odds).toString().slice(0,6),
        "awayOdds": (1/away_odds).toString().slice(0,6),
        "drawOdds": (1/draw_odds).toString().slice(0,6),
        "homeExpected": home_expected.toString().slice(0,6),
        "awayExpected": away_expected.toString().slice(0,6)
    }
}

const showFixture = (fx: any, res: any) => {
    const [fxDate, fxTime] = fx.DateUtc.split(" ")
    const prediction = getPrediction(fx.HomeTeam, fx.AwayTeam, res)
    return <div className={FixtureStyles.fixture}>
        <p style={{textAlign:"center"}}><b>{`${fx.HomeTeam} - ${fx.AwayTeam}`}</b></p>
        <div className={FixtureStyles.predictionsTwo}>
            <p>{`${fxDate}`}</p>
            <p style={{textAlign:"right"}}>{`${fxTime.slice(0,-4)}`}</p>
        </div>
        <div className={FixtureStyles.predictions}>
            <div style={{textAlign:"left"}}>
                <p><b>Home</b></p>
                <p>{prediction.homeExpected}</p>
                <p>{prediction.home}</p>
                <p><b>{prediction.homeOdds}</b></p>
            </div>
            <div style={{textAlign:"center"}}>
                <p><b>Draw</b></p>
                <p>{"-"}</p>
                <p>{prediction.draw}</p>
                <p><b>{prediction.drawOdds}</b></p>
            </div>
            <div style={{textAlign:"right"}}>
                <p><b>Away</b></p>
                <p>{prediction.awayExpected}</p>
                <p>{prediction.away}</p>
                <p><b>{prediction.awayOdds}</b></p>
            </div>
        </div>
    </div>
}

const dateisValid = (DateUTC: any) => {
    let currentTS = Date.parse(new Date().toISOString())
    let matchTS = Date.parse(DateUTC)
    if (currentTS > matchTS) { return false }
    const now = new Date().getTime()
    const [fxDate, fxTime] = DateUTC.split(" ")
    const [year,month, day] = fxDate.split("-")
    const [hour, minute, _] = fxTime.split(":") 
    const fxTimestamp = new Date(year, month, day, hour, minute).getTime()
    if ((fxTimestamp - now) > 604800000*5.5){ return false }
    return true
    
} 

const Fixtures: NextPage = () => {
    const past_matches = 760
    const past_bundes_matches = 612

    // ENGLAND 
    const fxEngland = fx_England
    let resEngland = res_England_20.concat(res_England_21)
    for (var res in res_England_22){
        const result = res_England_22[res]
        if (result.AwayTeamScore!=null && result.HomeTeamScore!=null){
            resEngland.push(result as any)
        }
    }
    resEngland = resEngland.slice(resEngland.length - past_matches)

    // SPAIN
    const fxSpain = fx_Spain
    let resSpain = res_Spain_20.concat(res_Spain_21 as any)
    for (var res in res_Spain_22){
        const result  = res_Spain_22[res]
        if (result.AwayTeamScore!=null && result.HomeTeamScore!=null){
            resSpain.push(result as any)
        }
    }
    resSpain = resSpain.slice(resSpain.length - past_matches)

    // GERMANY
    const fxGermany = fx_Germany
    let resGermany = res_Germany_20.concat(res_Germany_21 as any)
    for (var res in res_Germany_22){
        const result  = res_Germany_22[res]
        if (result.AwayTeamScore!=null && result.HomeTeamScore!=null){
            resGermany.push(result as any)
        }
    }
    resGermany = resGermany.slice(resGermany.length - past_bundes_matches)

    // ITALY
    const fxItaly = fx_Italy
    let resItaly = res_Italy_20.concat(res_Italy_21 as any)
    for (var res in res_Italy_22){
        const result  = res_Italy_22[res]
        if (result.AwayTeamScore!=null && result.HomeTeamScore!=null){
            resItaly.push(result as any)
        }
    }
    resItaly = resItaly.slice(resItaly.length - past_matches)

    // FRANCE
    const fxFrance = fx_France
    let resFrance = res_France_20.concat(res_France_21 as any)
    for (var res in res_France_22){
        const result  = res_France_22[res]
        if (result.AwayTeamScore!=null && result.HomeTeamScore!=null){
            resFrance.push(result as any)
        }
    }
    resFrance = resFrance.slice(resFrance.length - past_matches)

    return (
        <div>
            <Head>
                <title>PlayerOne - Fixtures</title>
                <meta name="description" content="Sports Analysis by Data Professionals" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
  
            <Navbar/>
            <div className="page_container">
                <h1><b>Fixtures</b></h1>
                {/* ENGLAND */}
                <div><h2><b>🇬🇧 England {`(${resEngland.length} Matches)`} </b></h2></div>
                <div style={upcomingStyle}>  
                    {
                        fxEngland.map((f)=>{
                            if (dateisValid(f.DateUtc)) {
                                return<div key={f.MatchNumber}>
                                    {showFixture(f, resEngland)}
                                </div>
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                {/* SPAIN */}
                <div><h2><b>🇪🇸 Spain {`(${resSpain.length} Matches)`} </b></h2></div>
                <div style={upcomingStyle}>  
                    {
                        fxSpain.map((f)=>{
                            if (dateisValid(f.DateUtc)) {
                                return<div key={f.MatchNumber}>
                                    {showFixture(f, resSpain)}
                                </div>
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                {/* GERMANY */}
                <div><h2><b>🇩🇪 Germany {`(${resGermany.length} Matches)`} </b></h2></div>
                <div style={upcomingStyle}>  
                    {
                        fxGermany.map((f)=>{
                            if (dateisValid(f.DateUtc)) {
                                return<div key={f.MatchNumber}>
                                    {showFixture(f, resGermany)}
                                </div>
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                {/* ITALY */}
                <div><h2><b>🇮🇹 Italy {`(${resItaly.length} Matches)`} </b></h2></div>
                <div style={upcomingStyle}>  
                    {
                        fxItaly.map((f)=>{
                            if (dateisValid(f.DateUtc)) {
                                return<div key={f.MatchNumber}>
                                    {showFixture(f, resItaly)}
                                </div>
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                {/* France */}
                <div><h2><b>🇫🇷 France {`(${resFrance.length} Matches)`} </b></h2></div>
                <div style={upcomingStyle}>  
                    {
                        fxFrance.map((f)=>{
                            if (dateisValid(f.DateUtc)) {
                                return<div key={f.MatchNumber}>
                                    {showFixture(f, resFrance)}
                                </div>
                            } else {
                                return null
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}
  
export default Fixtures