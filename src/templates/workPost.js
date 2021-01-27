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
                fluid(maxWidth: 2000) {
                    srcWebp
                    srcSetWebp
                }
                title
                contentful_id
              }
              title
              body {
                raw
                references {
                  ... on ContentfulAsset {
                    fluid(maxWidth: 1600) {
                        srcWebp
                        srcSetWebp
                    }
                    title
                    contentful_id
                  }
                }
              }
              fullWidthMedia {
                fluid(maxWidth: 2000) {
                    srcWebp
                    srcSetWebp
                }
                title
                contentful_id
              }
              mediaGallery {
                fluid(maxWidth: 1200) {
                    srcWebp
                    srcSetWebp
                }
                title
                contentful_id
              }
              twoCol
              landscape
              body2 {
                raw
                references {
                    ... on ContentfulAsset {
                        fluid(maxWidth: 1600) {
                            srcWebp
                            srcSetWebp
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
                    srcSetWebp
                }
                title
                contentful_id
              }
              fullWidthMedia2 {
                fluid(maxWidth: 2000) {
                    srcWebp
                    srcSetWebp
                }
                title
                contentful_id
              }
              mediaGallery2 {
                fluid(maxWidth: 1200) {
                    srcWebp
                    srcSetWebp
                }
                title
                contentful_id
              }
              twoCol2
              landscape2
              body3 {
                raw
                references {
                  ... on ContentfulAsset {
                    fluid(maxWidth: 1600) {
                        srcWebp
                        srcSetWebp
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
                    srcSetWebp
                }
                title
                contentful_id
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

    const options2 = renderEmdAssetBlock(instance?.body2?.references, instance?.body2?.references.title);

    const options3 = renderEmdAssetBlock(instance?.body3?.references, instance?.body3?.references?.title);

    return (
        <div className='main'>
            <Navbar />
            <div className='work-post-wrapper'>
                <img className='jumbotron' alt={instance.jumbotron.title} src={instance.jumbotron.fluid.srcWebp} />
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
                                <img alt={media.title} src={media.fluid.srcWebp} key={i} />
                            )
                        })}
                    </section>
                }
                {instance.mediaGallery &&
                    <section className={instance.twoCol ? 'grid-two-col' : 'grid-three-col'}>
                        {instance.mediaGallery.map((media, i) => {
                            return (
                                <img className={instance.landscape ? 'landscape' : 'portrait'} alt={media.title} src={media.fluid.srcWebp} key={i} />
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
                            <img className='featured-media' alt={instance.featuredMedia.title} src={instance.featuredMedia.fluid.srcWebp} />
                        }
                    </section>
                }
                {instance.fullWidthMedia2 &&
                    <section className='grid-one-col'>
                        {instance.fullWidthMedia2.map((media, i) => {
                            return (
                                <img alt={media.title} src={media.fluid.srcWebp} key={i} />
                            )
                        })}
                    </section>
                }
                {instance.mediaGallery2 &&
                    <section className={instance.twoCol2 ? 'grid-two-col' : 'grid-three-col'}>
                        {instance.mediaGallery2.map((media, i) => {
                            return (
                                <img className={instance.landscape2 ? 'landscape' : 'portrait'} alt={media.title} src={media.fluid.srcWebp} key={i} />
                            )
                        })}
                    </section>
                }
                {(instance.body3 || instance.featuredMedia2) &&
                    <section className={instance.featuredMedia2 ? 'flex-two-col title-text' : !instance.featuredMedia2 && instance.left ? 'flex-left' : 'flex-right'}>
                        {instance.featuredMedia2 &&
                            <img className='featured-media' alt={instance.featuredMedia2.title} src={instance.featuredMedia2.fluid.srcWebp} />
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