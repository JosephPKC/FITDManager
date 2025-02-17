// Core
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

// App
import { appRoutes } from "./app-routing.module";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};
