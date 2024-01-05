import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ColorPaletteDirective } from './directives/color-palette.directive';
import { HiddenDirective } from './directives/hidden/hidden.directive';
import { BookDisplayComponent } from './components/book-display/book-display.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HeaderMenuComponent,
    ColorPaletteDirective,
    HiddenDirective,
    BookDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
