import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TesterComponent } from "../_TESTING/tester.component"

export const appRoutes: Routes = [
  { path: "", redirectTo: "/tester", pathMatch: "full"},
  { path: "tester", component : TesterComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
