import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { renderEmdAssetBlock } from '../utils';

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlog (
        sort: {
            fields: published,
            order: DESC
          }
      ) {
        edges {
          node {
            title
            blurb {
              raw
              references {
                fluid(maxWidth: 1600) {
                  srcWebp
                  src
                }
                title
                contentful_id
              }
            }
            featuredMedia {
              fluid(maxWidth: 1600) {
                srcWebp
                src
              }
              title
            }
            published (
              formatString: "dddd, MMMM d, yyyy"
            )
            slug
            contentful_id
          }
        }
      }
    }
  `);

  const instances = data.allContentfulBlog.edges;
  const options = renderEmdAssetBlock(instances?.node?.blurb?.references, instances?.node?.blurb?.references?.title);

  return (
    <div className='main'>
      <Navbar />
      <div className='blog-wrapper'>
        {instances.map((el) => {
          return (
            <section key={el.contentful_id}>
              <div className='title-date'>
                <Link to={`/blog/${el.node.slug}`}><h1>{el.node.title}</h1></Link>
                <p>{el.node.published}</p>
              </div>
              <picture>
                <source srcSet={el.node.featuredMedia.fluid.src} />
                <img src={el.node.featuredMedia.fluid.srcWebp} alt={el.node.featuredMedia.title} />
              </picture>
              <div className='flex-left'>
                <div>
                  {documentToReactComponents(JSON.parse(el.node.blurb.raw), options)}
                </div>
              </div>
              <div className='flex-right'>
                <div className='piping read-more'>
                  <Link to={`/blog/${el.node.slug}`}><p>Read more</p></Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Blog;