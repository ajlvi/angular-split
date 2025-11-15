import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputFormComponent } from './input-container/input-form/input-form.component';
import { SplitRowComponent } from './split-row/split-row.component';
import { HttpClientModule } from '@angular/common/http';
import { TimePipe } from './time.pipe';
import { StatsDisplayComponent } from './stats-display/stats-display.component';

@NgModule({
  declarations: [
    AppComponent,
    InputContainerComponent,
    InputFormComponent,
    SplitRowComponent,
    TimePipe,
    StatsDisplayComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
