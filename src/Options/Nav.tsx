import browser, { } from 'webextension-polyfill'
import React, { useEffect } from "react";

const Nav = () => {
    return (
        <header className="w-full p-10 flex items-center">
            <div className="flex items-center flex-auto">
                <img className="w-5 h-5 mr-2" src="icon128.png"></img>
                <h1 className="text-xl text-gray-800">Scouter</h1>
            </div>
            <div>
                <span className='text-gray-500 text-sm'>{browser.runtime.getManifest().version}</span>
            </div>
        </header>
    )
}

export default Nav;