'use client';

import Error from 'next/error';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}