import Homepage from '../pages/homepage';

type AppProps = {
    placesCount: number;
}

export default function App({placesCount}: AppProps): JSX.Element {
  return (
    <Homepage placesCount={placesCount}/>
  );
}
