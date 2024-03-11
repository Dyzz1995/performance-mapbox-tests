import {
  CommonModule, isPlatformBrowser, isPlatformServer,
} from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  TransferState,
  inject,
  makeStateKey,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-mapbox-3D-client',
  templateUrl: './mapbox3d-client.component.html',
  styleUrls: ['./mapbox3d-client.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class Mapbox3DClientComponent implements OnInit {
  platformId = inject(PLATFORM_ID);
  transferState = inject(TransferState);
  dataKey = makeStateKey<{data:string}>("portugalCountryDataset")
  map!: mapboxgl.Map;
  style = 'mapbox://styles/rui-dias/clopys8hz00l201qm16e96wzw';
  accessToken =
    'pk.eyJ1IjoicnVpLWRpYXMiLCJhIjoiY2xncDEya3pzMHZsODNrbW1vdHl4a21xNiJ9.ICq1P0o3JbqxVaTKxpRjqw';
  lng = -9.1393;
  lat = 38.7223;

  // Portugal country dadd-clienttasets
  portugalCountryDataset!: any;
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.map = new mapboxgl.Map({
        accessToken: this.accessToken,
        container: 'mapHome2',
        style: this.style,
        zoom: 1.7,
        center: [this.lng, this.lat],
        maxZoom: 2.5
      });
      this.map.addControl(new mapboxgl.NavigationControl());

      const url = 'assets/datasets/fileList_PT.json';
      this.http.get(url).subscribe((res: any) => {
        this.portugalCountryDataset = `assets/datasets/portugal/${res.country}`;
        // this.transferState.set(this.dataKey, this.portugalCountryDataset) 
      });

      this.map.on('load', () => {
        this.renderPortugal('portugal');
      })

      
    }


    if (isPlatformServer(this.platformId)) {
    
    }

  }


  renderPortugal(countryName: string) {
    let portugalHoverTimeout: NodeJS.Timeout;
    if (this.map.getSource(countryName)) {
      this.map.removeSource(countryName);
    }
    
    this.map.addSource(countryName, {
      type: 'geojson',
      data: this.portugalCountryDataset
    });

    this.map.addLayer({
      id: `cf-${countryName}`, // country-fills
      type: 'fill-extrusion',
      source: countryName,
      layout: {},
      paint: {
        'fill-extrusion-color': '#2E8EFF', // Color of the extrusion
        'fill-extrusion-height': 0,
      },
    });

  }

}