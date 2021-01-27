import React from 'react';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { renderEmdAssetBlock } from '../utils';

export const query = graphql`
    query ($slug: String!) {
        contentfulBlog (slug: { eq: $slug }) {
            title
            body {
                raw
                references {
                    __typename
                    fluid(maxWidth: 2000) {
                        srcWebp
                        srcSetWebp
                    }
                    title
                    contentful_id
                }
            }
            published (
                formatString: "dddd, MMMM d, yyyy"
            )
        }
    }
`;

const BlogPost = ({ data }) => {
    const instance = data.contentfulBlog;

    const options = renderEmdAssetBlock(instance?.body?.references, instance?.body?.references?.title);

    return (
        <div className='main'>
            <Navbar />
            <div className='blog-post-wrapper'>
                <div className='title-date'>
                    <h1 className='blog-post-title'>{instance.title}</h1>
                    <p>{instance.published}</p>
                </div>
                <div className='blog-post-text'>{documentToReactComponents(JSON.parse(instance.body.raw), options)}</div>
            </div>
            <Footer />
        </div>
    )
}

export default BlogPost;