import React from 'react';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { renderEmdAssetBlock } from '../utils'

export const query = graphql`
    query ($slug: String!) {
        contentfulWork (slug: { eq: $slug }) {
            jumbotron {
                fluid(maxWidth: 1600) {
                    srcWebp
                    src
                }
                title
              }
              title
              body {
                raw
                references {
                  ... on ContentfulAsset {
                    fluid(maxWidth: 1600) {
                        srcWebp
                        src
                    }
                    title
                    contentful_id
                  }
                }
              }
              fullWidthMedia {
                fluid(maxWidth: 1600) {
                    srcWebp
                    src
                }
                title
              }
              mediaGallery {
                fluid(maxWidth: 1200) {
                    srcWebp
                    src
                }
                title
              }
              twoCol
              landscape
              body2 {
                raw
                references {
                    ... on ContentfulAsset {
                        fluid(maxWidth: 1600) {
                            srcWebp
                            src
                        }
                        title
                        contentful_id
                    }
                }
              }
              right
              featuredMedia {
                fluid(maxWidth: 1200) {
                    srcWebp
                    src
                }
                title
              }
              fullWidthMedia2 {
                fluid(maxWidth: 1600) {
                    srcWebp
                    src
                }
                title
              }
              mediaGallery2 {
                fluid(maxWidth: 1200) {
                    srcWebp
                    src
                }
                title
              }
              twoCol2
              landscape2
              body3 {
                raw
                references {
                  ... on ContentfulAsset {
                    fluid(maxWidth: 1600) {
                        srcWebp
                        src
                    }
                    title
                    contentful_id
                  }
                }
              }
              left
              featuredMedia2 {
                fluid(maxWidth: 1200) {
                    srcWebp
                    src
                }
                title
              }
              rightCredit {
                raw
              }
        }
    }
`;

const WorkPost = ({ data }) => {
    const {
        jumbotron,
        title,
        body,
        fullWidthMedia,
        mediaGallery,
        twoCol,
        landscape,
        body2,
        right,
        featuredMedia,
        fullWidthMedia2,
        mediaGallery2,
        twoCol2,
        landscape2,
        body3,
        left,
        featuredMedia2,
        rightCredit
    } = data.contentfulWork;
    const options = renderEmdAssetBlock(body?.references, body?.references?.title);
    const options2 = renderEmdAssetBlock(body2?.references, body2?.references?.title);
    const options3 = renderEmdAssetBlock(body3?.references, body3?.references?.title);

    return (
        <div className='main'>
            <Navbar />
            <div className='work-post-wrapper'>
                <picture>
                    <source srcSet={jumbotron.fluid.src} />
                    <img className='jumbotron' src={jumbotron.fluid.srcWebp} alt={jumbotron.title} />
                </picture>
                <section className={body ? 'flex-two-col title-text' : 'flex-left'}>
                    <h1 className='title'>{title} <span>||</span></h1>
                    {body &&
                        <div>
                            {documentToReactComponents(JSON.parse(body.raw), options)}
                        </div>
                    }
                </section>
                {fullWidthMedia &&
                    <section className='grid-one-col'>
                        {fullWidthMedia.map((media, i) => {
                            return (
                                <picture key={i}>
                                    <source srcSet={media.fluid.src} />
                                    <img src={media.fluid.srcWebp} alt={media.title} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {mediaGallery &&
                    <section className={twoCol ? 'grid-two-col' : 'grid-three-col'}>
                        {mediaGallery.map((media, i) => {
                            return (
                                <picture key={i}>
                                    <source srcSet={media.fluid.src} />
                                    <img className={landscape ? 'landscape' : 'portrait'} src={media.fluid.srcWebp} alt={media.title} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {(body2 || featuredMedia) &&
                    <section className={featuredMedia ? 'flex-two-col title-text' : !featuredMedia && right ? 'flex-right' : 'flex-left'}>
                        {body2 &&
                            <div>
                                {documentToReactComponents(JSON.parse(body2.raw), options2)}
                            </div>
                        }
                        {featuredMedia &&
                            <picture>
                                <source srcSet={featuredMedia.fluid.src} />
                                <img className='featured-media' src={featuredMedia.fluid.srcWebp} alt={featuredMedia.title} />
                            </picture>
                        }
                    </section>
                }
                {fullWidthMedia2 &&
                    <section className='grid-one-col'>
                        {fullWidthMedia2.map((media, i) => {
                            return (
                                <picture key={i}>
                                    <source srcSet={media.fluid.src} />
                                    <img src={media.fluid.srcWebp} alt={media.title} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {mediaGallery2 &&
                    <section className={twoCol2 ? 'grid-two-col' : 'grid-three-col'}>
                        {mediaGallery2.map((media, i) => {
                            return (
                                <picture key={i}>
                                    <source srcSet={media.fluid.src} />
                                    <img className={landscape2 ? 'landscape' : 'portrait'} src={media.fluid.srcWebp} alt={media.title} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {(body3 || featuredMedia2) &&
                    <section className={featuredMedia2 ? 'flex-two-col title-text' : !featuredMedia2 && left ? 'flex-left' : 'flex-right'}>
                        {featuredMedia2 &&
                            <picture>
                                <source srcSet={featuredMedia2.fluid.src} />
                                <img className='featured-media' src={featuredMedia2.fluid.srcWebp} alt={featuredMedia2.title} />
                            </picture>
                        }
                        {body3 &&
                            <div>
                                {documentToReactComponents(JSON.parse(body3.raw), options3)}
                            </div>
                        }
                    </section>
                }
                {rightCredit &&
                    <section className='credit-section'>
                        <div className='piping'>
                            {documentToReactComponents(JSON.parse(rightCredit.raw))}
                        </div>
                    </section>
                }
            </div>
            <Footer />
        </div>
    )
}

export default WorkPost;