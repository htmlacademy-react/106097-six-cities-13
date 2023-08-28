import { useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../hooks/use-map';
import { Offers, City } from '../types/offer';
import { useAppSelector } from '../hooks';
import { selectors } from '../middleware/index';

const URL_MARKER_DEFAULT = '../../public/img/pin.svg';
const URL_MARKER_CURRENT = '../../public/img/pin-active.svg';

type MapProps = {
  city: City;
  points: Offers;
  mapHeight: number;
  block: string;
}

export function Map({city, points, mapHeight, block}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  const selectedPoint = useAppSelector(selectors.activeOffer);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      const placeLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: selectedPoint?.id === point.id ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(placeLayer);
      });
      return () => {
        map.removeLayer(placeLayer);
      };
    }
  }, [map, points, selectedPoint, defaultCustomIcon, currentCustomIcon]);

  return (
    <section className={`${block}__map map`} style={{height: `${mapHeight}px` }} ref={mapRef} />
  );
}
