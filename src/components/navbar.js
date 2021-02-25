import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { isMobileViewport } from '../utils';
import '../styles/index.css';

const Navbar = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulWork (
                sort: {
                    fields: createdAt,
                    order: DESC
                }
            ) {
                edges {
                    node {
                        title
                        slug
                    }
                }
            }
            contentfulAsset(title: {eq: "headshot"}) {
                file {
                  url
                }
            }
        }
    `);

    const [ menuIndex, setMenuIndex ] = useState(null);
    const [ mobileMenu, setMobileMenu ] = useState(false);

    function closeMenu() {
        setMenuIndex(null);
    }

    function openMenu(e) {
        const index = Number(e.target.dataset.index);

        if (index === menuIndex) {
            closeMenu();
            return;
        }

        setMenuIndex(index);
    }

    function toggleMobileMenu() {
        if (menuIndex !== null) {
            closeMenu();
        }

        setMobileMenu(currMobileMenu => !currMobileMenu);
    }

    return (
        <nav id='navbar'>
            <div className='logo'>
                <Link to='/'>KATIE HODGE <span>||</span></Link>
            </div>
            <button onClick={toggleMobileMenu} className='hamburger'>
                <span className='line'></span>
                <span className='line'></span>
                <span className='line'></span>
            </button>
            <div className={!mobileMenu && isMobileViewport ? 'inactive' : 'menu'}>
                <div>
                    <button onClick={openMenu} data-index='0'>About</button>
                </div>
                <div className={menuIndex === 0 ? 'menu-about' : 'inactive'}>
                    <img alt='Katie Hodge Headshot' src={data.contentfulAsset.file.url} />
                    <p>Katie is a designer based in NYC. She received her BFA in Graphic Design with a minor in Marketing at Appalachian State University.</p>
                    <p>Download her <a href='http://assets.ctfassets.net/clm1muu58ksw/4gsJcKB09XCkgYOC7x0yb7/c7e5f9ce89363d06e37fbd7f820c56c7/resume_2020_v1.pdf' rel='noreferrer' target='_blank'>resume</a> or send her an <a href='mailto:hodgekm1@gmail.com'>email</a>.</p>
                    <p>Photo by <a href='https://www.brittanyherbertphotography.com/'>Brittany Herbert</a></p>
                </div>
                <div>
                    <button onClick={openMenu} data-index='1'>Work</button>
                </div>
                <ul className={menuIndex === 1 ? 'menu-work' : 'inactive'}>
                    {data.allContentfulWork.edges.map((el, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/work/${el.node.slug}`}>
                                    {el.node.title}
                                </Link>
                            </li>
                        )
                    })}
                    <li><Link to='/'>See All</Link></li>
                </ul>
                <div>
                    <button onClick={openMenu} data-index='2'>Process</button>
                </div>
                <div className={menuIndex === 2 ? 'menu-blog' : 'inactive'}>
                    <p>Follow Katie's process on her <Link to='/blog'>blog</Link>.</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;