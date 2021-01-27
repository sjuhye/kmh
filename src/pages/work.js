import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import GridItem from '../components/gridItem';

const Work = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulMediaGrid {
        nodes {
          text
          column
          order
          media {
            fluid(maxWidth: 800) {
              srcWebp
              srcSetWebp
            }
            title
            contentful_id
          }
          overlay {
            fluid(maxWidth: 800) {
              srcWebp
              srcSetWebp
            }
            title
            contentful_id
          }
          post {
            slug
          }
        }
      }
    }
  `);

  // allow dynamic ordering of content into columns
  const group = data.allContentfulMediaGrid.nodes.reduce((acc, node) => {
    acc[node.column] = [...acc[node.column] || [], node];
    return acc;
  }, {});

  const arrs = Object.values(group);

  arrs.forEach((arr) => {
    arr.sort((a, b) => {
      return a.order - b.order;
    });
  });

  return (
    <div className='main'>
      <Navbar />
      <div className='work-wrapper'>
        {arrs.map((arr, i) => {
          return (
            <section className='col' key={i}>
              {arr.map((el, j) => {
                return (
                  <Link to={`/work/${el.post.slug}`} key={j}>
                    <GridItem image={el.media.fluid.srcWebp} overlay={el.overlay.fluid.srcWebp} imageTitle={el.media.title} overlayTitle={el.overlay.title} text={el.text} />
                  </Link>
                )
              })}
            </section>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Work;