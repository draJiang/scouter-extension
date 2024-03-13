import React from "react";
import logoImage from '../assets/icon128.png'

interface LogoProps {
    style?: React.CSSProperties;
}

function Logo(props: LogoProps) {

    const defaultStyle = {
    };

    return <img style={{ ...defaultStyle, ...props.style }} src={logoImage} alt="Scouter" />;
}

export default Logo;