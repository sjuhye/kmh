import React, { Fragment, useState } from 'react';

const GridItem = ({ image, overlay, imageTitle, overlayTitle, text }) => {
    const [ hover, setHover ] = useState(false);

    function toggleOverlay() {
        setHover(!hover);
    }

    return (
        <Fragment>
            <div className='grid-item-container' onMouseEnter={toggleOverlay} onMouseLeave={toggleOverlay}>
                <img className='grid-item-image' src={image} alt={imageTitle} />
                <img className={hover ? 'grid-item-overlay' : 'hide'} src={overlay} alt={overlayTitle} />
                <div className={hover ? 'grid-item-text' : 'hide'}>{text}</div>
            </div>
        </Fragment>
    )
}

export default GridItem;