import { Component } from '@angular/core';
import { AuthRoutingModule } from "../../../features/auth/AuthRoutingModule";

@Component({
  selector: 'app-footer-component',
  imports: [AuthRoutingModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss'
})
export class FooterComponent {

}
