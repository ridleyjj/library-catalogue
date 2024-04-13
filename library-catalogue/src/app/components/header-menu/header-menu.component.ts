import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color-service/color-service.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
  constructor(public colorService: ColorService) {}
}
