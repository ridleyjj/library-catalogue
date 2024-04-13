import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ColorPaletteDirective } from './directives/color-palette.directive';
import { HiddenDirective } from './directives/hidden/hidden.directive';
import { BookDisplayComponent } from './components/book-display/book-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CurrentlyReadingComponent } from './components/currently-reading/currently-reading.component';
import { SimpleLargeBookComponent } from './components/simple-large-book/simple-large-book.component';
import { BookCoverComponent } from './components/book-cover/book-cover.component';
import { CategoryBrowseComponent } from './components/category-browse/category-browse.component';
import { BookcaseComponent } from './components/bookcase/bookcase.component';
import { ShelfComponent } from './components/shelf/shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HeaderMenuComponent,
    ColorPaletteDirective,
    HiddenDirective,
    BookDisplayComponent,
    HomePageComponent,
    CurrentlyReadingComponent,
    SimpleLargeBookComponent,
    BookCoverComponent,
    CategoryBrowseComponent,
    BookcaseComponent,
    ShelfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
