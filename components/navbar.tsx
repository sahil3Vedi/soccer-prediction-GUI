// React
import React, { Component } from 'react';
// Next
import Image from 'next/image';
import Link from 'next/link';
// moment
import moment from 'moment'
// Styles
import NavbarStyles from '../styles/navbar.module.css';


const Navbar = () => {
    return (
        <div className={NavbarStyles.navbar}>
            <div><Link href="/"><Image src="/logoblack.png" className={NavbarStyles.navbarLogo} width={40} height={40}/></Link></div>
            <div><Link href="/"><h1 className={NavbarStyles.brandText}><b>PlayerOne</b></h1></Link></div>
            <div><p className={NavbarStyles.navbarLink}>{moment().format('LT')}</p></div>
            <div><Link href="/bets"><p className={NavbarStyles.navbarLink}>Bets</p></Link></div>
            <div><Link href="/fixtures"><p className={NavbarStyles.navbarLink}>Fixtures</p></Link></div>
            <div><Link href="/results"><p className={NavbarStyles.navbarLink}>Results</p></Link></div>
            <div><p className={NavbarStyles.navbarLink}>Login</p></div>
        </div>
    )
}

export default Navbar