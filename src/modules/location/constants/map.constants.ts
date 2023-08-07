import { divIcon } from 'leaflet';
import styles from '@/modules/location/map/map.module.scss';

export const proUserMarkerIcon = divIcon({
  html: `<div class=${styles.iconContainer}>
            <img class=${styles.avatarImg} src='https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVzc2lhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D&w=1000&q=80' alt='Marker' />
          </div>`,
  iconSize: [0, 0],
  iconAnchor: [20, 50],
  className: '',
});

export const viewerUserMarkerIcon = divIcon({
  html: `<div class=${styles.markerContainer}>
            <div class=${styles.markerAnimation}></div>
            <div class=${styles.markerCenter}></div>
          </div>`,
});
