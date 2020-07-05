import React from 'react';
import Link from 'next/link'
import Button from './components/Button';

export async function getServerSideProps({ query }) {
  let channelId = query.id;
  let req = await fetch(`https://api.audioboom.com/channels/${channelId}`);
  let { body: { channel } } = await req.json();

  return { props: { channel: channel } }; 
}

const ChannelDetails = ({ channel }) => {
  return (
    <>
    <header>
      <Link href="/">
        <Button>
          Back to home
        </Button>
      </Link>
    </header>
    <main>
      <div className="header">
        <h2>{channel.title}</h2>
      </div>
      <div className="channel">
        <img src={channel.urls?.logo_image.original} alt={channel.title} />
      </div>
    </main>

      <style jsx>{`

        header {
          margin: 10px 0 10px;
        }

        .header {
          color: green;
        }

        .channel {
          display: block;
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          margin-bottom: 0.5em;
        }

        .channel img {
          width: 50%;
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

export default ChannelDetails;
