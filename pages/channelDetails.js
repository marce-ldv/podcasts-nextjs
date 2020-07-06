import React from 'react';
import Link from 'next/link'
import Button from './components/Button'

export async function getServerSideProps({ query }) {
  let channelId = query.id;
  let [reqChannel, reqSeries, reqAudios] = await Promise.all([
    await fetch(`https://api.audioboom.com/channels/${channelId}`),
    await fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`),
    await fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`)
  ])

  let dataChannel = await reqChannel.json()
  let channel = dataChannel.body.channel
  
  let dataSeries = await reqSeries.json()
  let series = dataSeries.body.channels

  let dataAudios = await reqAudios.json()
  let audioClips = dataAudios.body.audio_clips

  return { props: { channel, series, audioClips } }; 
}

const ChannelDetails = ({ channel, series, audioClips }) => {
  console.log(audioClips)
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

        <div className="audioClips">
          <h2>Audio clips</h2>
          {audioClips?.map(({title, duration}) => (
            <>
              <div>Title: {title}</div>
              <div>Duration: {duration}</div>
            </>
          ))}
        </div>
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

        .channel {
          color: green;
        }
      `}</style>
    </>
  )
}

export default ChannelDetails
