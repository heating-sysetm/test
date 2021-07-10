import { TempOneComponent } from './components/widgets/temp-one/temp-one.component';
import { AreaChartComponent } from './components/charts/area-chart/area-chart.component';
import { SettingModule } from './pages/setting/setting.module';
import { UsersModule } from './pages/users/users.module';
import { SideNavModule } from './components/side-nav/side-nav.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ChartjsAreaComponent } from './components/charts/chartjs-area/chartjs-area.component';
import { SolidGaugeThreeComponent } from './components/charts/solid-gauge-three/solid-gauge-three.component';
import { GaugeTempComponent } from './components/charts/gauge-temp/gauge-temp.component';
import { SolidGaugeComponent } from './components/charts/solid-gauge/solid-gauge.component';
import { ColumnBasicComponent } from './components/charts/column-basic/column-basic.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { WeatherComponent } from './components/weather/weather.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then(
        m => m.LoginModule
      )
  },
  {
    path:'pages',component:SideNavComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            m=>m.DashboardModule
          )
       },
       {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then(
            m=>m.UsersModule
          )
       },
       {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts/charts.module').then(
            m=>m.ChartsModule
          )
       },
       {
        path: 'calendar',
        loadChildren: () =>
          import('./pages/calendar/calendar.module').then(
            m=>m.CalendarModule
          )
       },
       {
        path: 'setting',
        loadChildren: () =>
          import('./pages/setting/setting.module').then(
            m=>m.SettingModule
          )
       },
    ] 
  },

  // {
  //   path:'test',component:WeatherComponent
  // }
  // {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),SideNavModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
