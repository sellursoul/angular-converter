import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {ConverterComponent} from "./converter/converter.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path:'', component: ConverterComponent}
    ]
  },
  {path: '**', redirectTo: '/'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
