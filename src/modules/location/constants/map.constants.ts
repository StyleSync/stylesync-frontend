import { divIcon } from 'leaflet';
import styles from '@/modules/location/components/map/map.module.scss';

const ICON_ANCHOR_X = 20;
const ICON_ANCHOR_Y = 50;

export const proUserMarkerIcon = (urlAvatar: string) =>
  divIcon({
    html: `<div class=${styles.iconContainer}>
            <img class=${styles.avatarImg} src=${urlAvatar} alt='Marker' />
          </div>`,
    iconSize: [0, 0],
    iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
    className: '',
  });

export const viewerUserMarkerIcon = divIcon({
  html: `<div class=${styles.markerContainer}>
            <div class=${styles.markerAnimation}></div>
            <div class=${styles.markerCenter}></div>
          </div>`,
});
