import React from "react";

const Burger = ({ className, handler }) => (
    <svg width="40" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg" 
    className={className}
    onClick={handler}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31 15L9 15V12.5L31 12.5V15Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31 24L9 24V21.5L31 21.5V24Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31 33L9 33V30.5L31 30.5V33Z" fill="black"/>
    </svg>
    
);

export default Burger;