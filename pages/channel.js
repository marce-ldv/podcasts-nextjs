import React from 'react';
import Link from 'next/link'

const Channel = ({id, urls, title }) => {
  return (
    <>
    <Link href={`/channel?id=${id}`}>
      <div className="channel">
        <img src={urls?.logo_image.original} alt={title} />
        <h2>{title}</h2>
      </div>
      </Link>

      <style jsx>{`
        .channel {
          display: block;
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          margin-bottom: 0.5em;
        }

        .channel img {
          width: 100%;
        }

        .channel h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default Channel;
