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
                    fluid(maxWidth: 1600) {
                        srcWebp
                        src
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

const BlogPost = ({ data, pathContext }) => {
    const instance = data.contentfulBlog;

    const options = renderEmdAssetBlock(instance?.body?.references, instance?.body?.references?.title);

    return (
        <div className='main'>
            <Navbar />
            <div className='blog-post-wrapper'>
                <section className='title-date'>
                    <h1 className='blog-post-title'>{instance.title}</h1>
                    <p>{instance.published}</p>
                </section>
                <section className='blog-post-text'>
                    {documentToReactComponents(JSON.parse(instance.body.raw), options)}
                </section>
                <section className={(pathContext.prev && pathContext.next) ? 'flex-two-col' : pathContext.prev ? 'prev' : 'next'}>
                    {pathContext.prev &&
                        <Link to={`/blog/${pathContext.prev.slug}`}><p>&#8592; Previous</p></Link>
                    }
                    {pathContext.next &&
                        <Link to={`/blog/${pathContext.next.slug}`}><p>Next &#8594;</p></Link>
                    }
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default BlogPost;