import React, { Fragment } from 'react';

const GridItem = ({ image, overlay, text, toggleOverlay, hover }) => {
    return (
        <Fragment>
            <div className='grid-item-container' onMouseEnter={toggleOverlay} onMouseLeave={toggleOverlay} role='img'>
                <picture>
                    <source srcSet={image.fluid.src} />
                    <img className='grid-item-image' src={image.fluid.srcWebp} alt={image.title} />
                </picture>
                <picture>
                    <source srcSet={overlay.fluid.src} />
                    <img className={hover ? 'grid-item-overlay' : 'inactive'} src={overlay.fluid.srcWebp} alt={overlay.title} />
                </picture>
                <div className={hover ? 'grid-item-text' : 'inactive'}>{text}</div>
            </div>
        </Fragment>
    )
}

export default GridItem;