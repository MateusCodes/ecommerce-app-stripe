import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className="footer-container">
            <p>2022 - MateusCodes® - All rights reserved</p>
            <p className="icons">
                <a
                    target="_blank"
                    href="https://github.com/MateusCodes"
                    rel="noreferrer"
                >
                    <AiFillGithub />
                </a>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/mateus-sobreira-734433184/"
                    rel="noreferrer"
                >
                    <AiFillLinkedin />
                </a>
            </p>
        </div>
    );
};

export default Footer;
