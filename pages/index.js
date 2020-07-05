import Head from 'next/head'
import 'isomorphic-fetch'

export async function getServerSideProps() {
  let req = await fetch('https://api.audioboom.com/channels/recommended');
  let { body: channels } = await req.json();

  return { props: { channels: channels } };
}

const Home = ({ channels }) => {
  // console.log(channels)
  return (
    <div className="container">
      <Head>
        <header>
          <title>Podcasts Nextjs</title>
          <link rel="icon" href="/favicon.ico" />
        </header>
      </Head>

      <div className="channels">
        {channels.map(({urls, title}) => (
          <div className="channel">
            <img src={urls.logo_image.original} alt={title} />
            <h2>{title}</h2>
          </div>
        ))}
      </div>

      <footer>
        <a target="_blank" rel="noopener noreferrer">
          Powered by Marcelo
        </a>
      </footer>

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
          grid-template-columns: repeat(auto-fill, mixmax(160px, 1fr));
        }
        .channel {
          display: block;
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
          margin-bottom: 0.5em;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          background: white;
          font-family: system-ui;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home;
