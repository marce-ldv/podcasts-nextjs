import Head from 'next/head'
import Link from 'next/link'
import Channel from './channel';
import 'isomorphic-fetch'

export async function getServerSideProps() {
  let req = await fetch('https://api.audioboom.com/channels/recommended');
  let { body: channels } = await req.json();

  return { props: { channels: channels } };
}

function Home({ channels }) {
  return (
    <>
      <header>Podcasts nextjs</header>

      <div className="channels">
        {channels?.map(({id, urls, title}) => (
          <Channel id={id} urls={urls} title={title} />
        ))}
      </div>

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }

        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }

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

      <style jsx global>{`
        body {
          margin: 0;
          background: white;
          font-family: system-ui;
        }
      `}</style>
    </>
  );
}

export default Home;