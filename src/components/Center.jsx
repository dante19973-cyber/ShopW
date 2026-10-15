import React from 'react'
import RouteM from './RouteM';
import {BrowserRouter, Routes, Route,NavLink} from 'react-router-dom'
import Home from './pages/Home';
import SilverS from './pages/SilverS';
import MetalS from './pages/MetalS';
import Armors from './pages/Armors';
import Boots from './pages/Boots';
import Gauntlets from './pages/Gauntlets';
import Trousers from './pages/Trousers';
import Sets from './pages/Sets';
import Basket from "./Basket.jsx";
function Center(){
    return(
            <BrowserRouter>
                <RouteM/>
                <header>
                    <h1><img className="logo" src="./logo.webp" alt="logo" />All For Hunter</h1>
                <nav>
                   <ul className="nav">
                       <li><NavLink to="/">Home</NavLink></li>
                       <li><NavLink to="/SilverS">Silver Sword</NavLink></li>
                       <li><NavLink to="/MetalS">Steel Sword</NavLink></li>
                       <li><NavLink to="/Armors">Armors</NavLink></li>
                       <li><NavLink to="/Boots">Boots</NavLink></li>
                       <li><NavLink to="/Gauntlets">Gauntlets</NavLink></li>
                       <li><NavLink to="/Trousers">Trousers</NavLink></li>
                       <li><NavLink to="/Sets">Sets</NavLink></li>
                   </ul>
                </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/SilverS" element={<SilverS />} />
                        <Route path="/MetalS" element={<MetalS/>} />
                        <Route path="/Armors" element={<Armors/>} />
                        <Route path="/Boots" element={<Boots/>} />
                        <Route path="/Gauntlets" element={<Gauntlets/>} />
                        <Route path="/Trousers" element={<Trousers/>} />
                        <Route path="/Sets" element={<Sets/>} />
                    </Routes>
                    <Basket/>
                </main>
                <footer className="footer">
                    <p className="footerRunes" aria-hidden="true">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</p>
                    <p className="footerText">© 1272 year</p>
                </footer>
            </BrowserRouter>
    )
}
export default Center
