import React, { useEffect, useState, useRef } from "react";
import { openScouter } from '../index'
import { captureVideoScreenshot } from './util'

interface CaptionPProps {
    children: React.ReactNode;
}

export const CaptionLine: React.FC<CaptionPProps> = ({ children }) => {

    
    

    const captionStyle = {
        fontSize: '2.2rem',
        width: 'fit-content',
        margin: '0 auto',
        padding: '4px',
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem'
    }



    return <div
        style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(8, 8, 8, 0.75)', padding: '0 30px' }}>
        <p
            className='captionP'
            style={captionStyle}>
            {children}
        </p>
    </div>
};