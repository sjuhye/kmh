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

const BlogPost = ({ data, pageContext }) => {
    const { title, body, published } = data.contentfulBlog;
    const { prev, next } = pageContext;
    const options = renderEmdAssetBlock(body?.references, body?.references?.title);

    return (
        <div className='main'>
            <Navbar />
            <div className='blog-post-wrapper'>
                <section className='title-date'>
                    <h1 className='blog-post-title'>{title}</h1>
                    <p>{published}</p>
                </section>
                <section className='blog-post-text'>
                    {documentToReactComponents(JSON.parse(body.raw), options)}
                </section>
                <section className={(prev && next) ? 'flex-two-col' : prev ? 'prev' : 'next'}>
                    {prev &&
                        <Link to={`/blog/${prev.slug}`}><p>&#8592; Previous</p></Link>
                    }
                    {next &&
                        <Link to={`/blog/${next.slug}`}><p>Next &#8594;</p></Link>
                    }
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default BlogPost;