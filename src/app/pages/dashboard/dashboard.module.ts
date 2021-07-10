import { ClockComponent } from './../../components/charts/clock/clock.component';
import { WidgetsComponent } from './../../components/widgets/widgets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HumidityChartComponent } from './../../components/charts/humidity-chart/humidity-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartjsAreaComponent } from './../../components/charts/chartjs-area/chartjs-area.component';
import { SolidGaugeThreeComponent } from './../../components/charts/solid-gauge-three/solid-gauge-three.component';
import { SolidGaugeTwoComponent } from './../../components/charts/solid-gauge-two/solid-gauge-two.component';
import { TempOneComponent, DialogOverviewExampleDialog } from './../../components/widgets/temp-one/temp-one.component';
import { LineChartComponent } from './../../components/charts/line-chart/line-chart.component';
import { SolidGaugeComponent } from './../../components/charts/solid-gauge/solid-gauge.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgClockPickerLibModule } from 'ng-clock-picker-lib';
import { GaugeTempComponent } from 'src/app/components/charts/gauge-temp/gauge-temp.component';
import { WeatherComponent } from 'src/app/components/weather/weather.component';
@NgModule({
  declarations: [
    DashboardComponent,
    TempOneComponent,
    SolidGaugeComponent,
    SolidGaugeTwoComponent,
    SolidGaugeThreeComponent,
    ChartjsAreaComponent,
    LineChartComponent,
    HumidityChartComponent,
    WidgetsComponent,
    DialogOverviewExampleDialog,GaugeTempComponent,WeatherComponent,ClockComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // BrowserAnimationsModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    TranslateModule,
    // NgClockPickerLibModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModpages/dashboardule,
    // MatDatepickerModule,
    MatDialogModule,
    // MatDividerModule,
    MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    MatInputModule,
    // MatListModule,
    MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    MatSelectModule,
    // MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatSortModule,
    // MatTabsModule,
    // MatTooltipModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
