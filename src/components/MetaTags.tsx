
import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags: React.FC<{ title?: string, description?: string, image?: string, name?: string }> = ({ title = '', description = '', image = '', name = '' }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel='canonical' href={window.location.href} />
            <meta name='description' content={description} />

            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="200" />
        </Helmet>
    );
}

export default MetaTags;