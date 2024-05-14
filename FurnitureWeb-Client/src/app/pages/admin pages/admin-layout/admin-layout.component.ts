import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{
  constructor(private router: Router,
    private route: ActivatedRoute
  ) {
    
  }
  
  ngOnInit(): void {
    console.log(this.route.snapshot)
  }

  isOpen: boolean = false

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
