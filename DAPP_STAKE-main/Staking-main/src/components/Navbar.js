import React from "react"
import bank from '../bank.png'

// added css and link from react router
import "./App.css";
import { Link } from "react-router-dom";


const Navbar = props => {
    return (

        // position added
        <nav className="navbar navbar-dark fixed-top shadow p-0" style={{ color: "black", backgroundColor: "white", position: "fixed" }}>

            <Link to="/" className="navbar-brand col-sm3 col-md-2 mr-0" style={{color: "black"}}>
                <img src={bank} width='50' height='30' className="d-inline-block align-top" alt="bank"></img>
                &nbsp; DAPP Yield Staking (Decentralized Banking) 
            </Link>
            <Link to="/news" className="cyrpto-button-to-news">
                View Crypto News
            </Link>
            <ul className='navbar-nav px-3'>
                <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                    <small>ACCOUNT NUMBER: {props.account}</small>
                </li>
            </ul>
        </nav >
    )
}

export default Navbar
