import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AsideComponent } from './aside/aside.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  providers: []
})

export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return{
      ngModule: CoreModule,
      providers:[]
    }
  }
}
