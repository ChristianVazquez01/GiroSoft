import { NgModule } from '@angular/core';
import { EntradaPage } from './entrada.page';
import { EntradaPageRoutingModule } from './entrada-routing.module';

@NgModule({
  imports: [
    EntradaPage,
    EntradaPageRoutingModule
  ],
  exports: [EntradaPage]
})
export class EntradaPageModule {}