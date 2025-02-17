// Core
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

// App
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SheetViewerModule } from "./features/sheet-viewer/sheet-viewer.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SheetViewerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [
    FormsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
