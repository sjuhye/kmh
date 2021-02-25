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
              src
            }
            title
          }
          overlay {
            fluid(maxWidth: 800) {
              srcWebp
              src
            }
            title
          }
          post {
            slug
          }
          contentful_id
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
        {arrs.map((arr) => {
          return (
            <section className='col' key={arr.column}>
              {arr.map((el) => {
                return (
                  <Link to={`/work/${el.post.slug}`} key={el.contentful_id}>
                    <GridItem image={el.media} overlay={el.overlay} text={el.text} />
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