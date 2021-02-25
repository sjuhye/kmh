import React from 'react';

export const renderEmdAssetBlock = (references, title) => {
    return {
        renderNode: {
            'embedded-asset-block': (node) => {
                const id = node.data.target.sys.id;
                const reference = references.find((reference) => reference.contentful_id === id);
                
                return (
                    <picture>
                        <source srcSet={reference.fluid.src} />
                        <img src={reference.fluid.srcWebp} alt={title} />
                    </picture>
                )
            }
        }
    }
}

export const isMobileViewport = () => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
}