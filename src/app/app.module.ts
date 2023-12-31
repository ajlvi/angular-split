import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputFormComponent } from './input-container/input-form/input-form.component';
import { SplitRowComponent } from './split-row/split-row.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InputContainerComponent,
    InputFormComponent,
    SplitRowComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
