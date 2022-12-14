import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(50, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(50, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavBarComponent implements OnInit {
  @Output() changeThemeEvent = new EventEmitter();
  text = 'hello';
  hideMobileMenu = true;
  @Input() isDarkEnable: boolean = false;

  constructor(
    private eRef: ElementRef,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  onMenuClick() {
    this.hideMobileMenu = !this.hideMobileMenu;
  }

  // close the menu on outside click
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileMenu = true;
    }
  }

  onNavLinkClick(btnName: string) {
    let currentUrl = this.router.url;
    if (currentUrl == btnName) {
      window.location.reload();
    }
    this.router.navigate([btnName]);
    this.hideMobileMenu = true;
  }
  onCategoryClick(categoryName: string) {
    this.router.navigateByUrl('/results?category=' + categoryName);
  }

  changeBodyTheme() {
    this.isDarkEnable = !this.isDarkEnable;
    this.changeThemeEvent.emit();
  }

  priceAlertCartBtnClick() {
    this.router.navigateByUrl('/price-alerts-page');
  }
}
