import React from 'react';

const Footer = () => {
    const date = new Date();

    return (
        <footer id='footer'>
            <span>{`Copyright © ${date.getFullYear()}, SGC`}</span>
            <span>
                <a href='https://instagram.com/hodgekm' rel='noreferrer' target='_blank'>Instagram</a>
                <a href='https://linkedin.com/in/hodgekm' rel='noreferrer' target='_blank'>LinkedIn</a>
            </span>
        </footer>
    );
}

export default Footer;