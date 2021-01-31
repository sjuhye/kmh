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
    const instance = data.contentfulWork;

    const options = renderEmdAssetBlock(instance?.body?.references, instance?.body?.references?.title);

    const options2 = renderEmdAssetBlock(instance?.body2?.references, instance?.body2?.references?.title);

    const options3 = renderEmdAssetBlock(instance?.body3?.references, instance?.body3?.references?.title);

    return (
        <div className='main'>
            <Navbar />
            <div className='work-post-wrapper'>
                <picture>
                    <source srcSet={instance.jumbotron.fluid.src} />
                    <img className='jumbotron' src={instance.jumbotron.fluid.srcWebp} alt={instance.jumbotron.title} />
                </picture>
                <section className={instance.body ? 'flex-two-col title-text' : 'flex-left'}>
                    <h1 className='title'>{instance.title} <span>||</span></h1>
                    {instance.body &&
                        <div>
                            {documentToReactComponents(JSON.parse(instance.body.raw), options)}
                        </div>
                    }
                </section>
                {instance.fullWidthMedia &&
                    <section className='grid-one-col'>
                        {instance.fullWidthMedia.map((media, i) => {
                            return (
                                <picture>
                                    <source srcSet={media.fluid.src} />
                                    <img src={media.fluid.srcWebp} alt={media.title} key={i} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {instance.mediaGallery &&
                    <section className={instance.twoCol ? 'grid-two-col' : 'grid-three-col'}>
                        {instance.mediaGallery.map((media, i) => {
                            return (
                                <picture>
                                    <source srcSet={media.fluid.src} />
                                    <img className={instance.landscape ? 'landscape' : 'portrait'} src={media.fluid.srcWebp} alt={media.title} key={i} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {(instance.body2 || instance.featuredMedia) &&
                    <section className={instance.featuredMedia ? 'flex-two-col title-text' : !instance.featuredMedia && instance.right ? 'flex-right' : 'flex-left'}>
                        {instance.body2 &&
                            <div>
                                {documentToReactComponents(JSON.parse(instance.body2.raw), options2)}
                            </div>
                        }
                        {instance.featuredMedia &&
                            <picture>
                                <source srcSet={instance.featuredMedia.fluid.src} />
                                <img className='featured-media' src={instance.featuredMedia.fluid.srcWebp} alt={instance.featuredMedia.title} />
                            </picture>
                        }
                    </section>
                }
                {instance.fullWidthMedia2 &&
                    <section className='grid-one-col'>
                        {instance.fullWidthMedia2.map((media, i) => {
                            return (
                                <picture>
                                    <source srcSet={media.fluid.src} />
                                    <img src={media.fluid.srcWebp} alt={media.title} key={i} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {instance.mediaGallery2 &&
                    <section className={instance.twoCol2 ? 'grid-two-col' : 'grid-three-col'}>
                        {instance.mediaGallery2.map((media, i) => {
                            return (
                                <picture>
                                    <source srcSet={media.fluid.src} />
                                    <img className={instance.landscape2 ? 'landscape' : 'portrait'} src={media.fluid.srcWebp} alt={media.title} key={i} />
                                </picture>
                            )
                        })}
                    </section>
                }
                {(instance.body3 || instance.featuredMedia2) &&
                    <section className={instance.featuredMedia2 ? 'flex-two-col title-text' : !instance.featuredMedia2 && instance.left ? 'flex-left' : 'flex-right'}>
                        {instance.featuredMedia2 &&
                            <picture>
                                <source srcSet={instance.featuredMedia2.fluid.src} />
                                <img className='featured-media' src={instance.featuredMedia2.fluid.srcWebp} alt={instance.featuredMedia2.title} />
                            </picture>
                        }
                        {instance.body3 &&
                            <div>
                                {documentToReactComponents(JSON.parse(instance.body3.raw), options3)}
                            </div>
                        }
                    </section>
                }
                {instance.rightCredit &&
                    <section className='credit-section'>
                        <div className='piping'>
                            {documentToReactComponents(JSON.parse(instance.rightCredit.raw))}
                        </div>
                    </section>
                }
            </div>
            <Footer />
        </div>
    )
}

export default WorkPost;