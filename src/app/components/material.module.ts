//This componet it's for compile all modules from angular materiaal
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [MatCardModule],
})
export class MaterialModule {}
