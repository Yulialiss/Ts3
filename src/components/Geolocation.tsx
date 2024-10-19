import { FC } from 'react'

type Props = {
  latitude: number | null
  longitude: number | null
  sum: number | null
}

const Geolocation: FC<Props> = ({ latitude, longitude, sum }) => (
  <div>
    <h1>Geolocation:</h1>
    <div>Latitude: {latitude}</div>
    <div>Longitude: {longitude}</div>
    <div>Sum: {sum}</div>
  </div>
)

export default Geolocation
