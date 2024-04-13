import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color-service/color-service.service';
import { HOME_PAGE_PALLETTE } from 'src/app/colour.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private colorService: ColorService) {}

  public ngOnInit(): void {
    // set colour palette
    this.colorService.setColorPalette(HOME_PAGE_PALLETTE);
    // get currently reading ids
    // get all categories/sub-sections (i.e. Plays/Poetry/Novels etc.)
  }
}
