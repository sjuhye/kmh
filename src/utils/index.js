import React from 'react';

export const renderEmdAssetBlock = (references, title) => {
    return {
        renderNode: {
            'embedded-asset-block': (node) => {
                const id = node.data.target.sys.id;
                const reference = references.find((reference) => reference.contentful_id === id);
                
                return <img src={reference.fluid.srcWebp} alt={title} />
            }
        }
    }
}