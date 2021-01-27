import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const PageNotFound = () => {
    return (
        <div className='main'>
            <Navbar />
            <div className='error-wrapper'>
                <h1>Sorry! Couldn't find the page you're looking for.</h1>
                <p>Either this page doesn't exist or it's been moved.</p>
                <p>If you're looking for a work post, try visiting the <Link to='/'>homepage</Link> or selecting a specific work post from the Work menu dropdown.</p>
                <p>If you're looking for a blog post, try visiting the main <Link to='/blog'>blog page</Link>.</p>
            </div>
            <Footer />
        </div>
    )
}

export default PageNotFound;