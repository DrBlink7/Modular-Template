import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';

export const SHARED_MODULES = [
  CommonModule,
  MaterialModule
];

export const SHARED_COMPONENTS = [];

@NgModule({
  declarations: SHARED_COMPONENTS,
  imports: SHARED_MODULES,
  exports: [SHARED_MODULES, SHARED_COMPONENTS]
})
export class SharedModule { }
