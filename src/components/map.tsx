import { useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '../hooks/use-map';
import { Offers, City, OfferPreview, Offer } from '../types/offer';

const URL_MARKER_DEFAULT = '../../public/img/pin.svg';
const URL_MARKER_CURRENT = '../../public/img/pin-active.svg';

type MapProps = {
  city: City;
  points: Offers;
  selectedPoint?: Offer | OfferPreview | null;
  mapHeight: number;
  block: string;
}

export function Map({city, selectedPoint, points, mapHeight, block}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

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
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(placeLayer);
      });
      if (selectedPoint) {
        leaflet
          .marker({
            lat: selectedPoint.location.latitude,
            lng: selectedPoint.location.longitude,
          }, {
            icon: currentCustomIcon,
          })
          .addTo(placeLayer);
      }
      return () => {
        map.removeLayer(placeLayer);
      };
    }
  }, [map, points, selectedPoint, defaultCustomIcon, currentCustomIcon, city.location.latitude, city.location.longitude, city.location.zoom]);

  return (
    <section className={`${block}__map map`} style={{height: `${mapHeight}px` }} ref={mapRef} />
  );
}
