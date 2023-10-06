//This componet it's for compile all modules from angular material
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [MatCardModule, MatToolbarModule],
})
export class MaterialModule {}
