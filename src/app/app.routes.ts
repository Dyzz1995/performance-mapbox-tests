import { Routes } from '@angular/router';
import { Mapbox3DComponent } from './mapbox-3D/mapbox-3D.component';
import { Mapbox3DClientComponent } from './mapbox3d-client/mapbox3d-client.component';

export const routes: Routes = [
    {
        path: 'server',
        component: Mapbox3DComponent,
    },
    {
        path: 'client',
        component: Mapbox3DClientComponent,
    },

];
