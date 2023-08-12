import { useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../hooks/use-map';
import { Offers, City, NearbyOffers } from '../types/offer';
import { useAppSelector } from '../hooks';

const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

type MapProps = {
  city: City;
  points: Offers | NearbyOffers;
  mapHeight: number;
  block: string;
}

export function Map({city, points, mapHeight, block}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  const selectedPoint = useAppSelector((state) => state.activeOffer);

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
            icon: selectedPoint === point.id ? currentCustomIcon : defaultCustomIcon,
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
