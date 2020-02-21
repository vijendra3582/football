import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  menues = [
    {
      "name": "Dashboard", 
      "link": "admin", 
      "icon": "dashboard"
    },
    {
      "name": "Academy",
      "link": "admin/academy",
      "icon": "home",
      "children": [
        {"name": "Create Academy", "link": "admin/academy/create"},
        {"name": "Manage Academy", "link": "admin/academy"}
      ]
    },
    {
      "name": "Coach",
      "link": "admin/coach",
      "icon": "golf_course",
      "children": [
        {"name": "Create Coach", "link": "admin/coach/create"},
        {"name": "Manage Coach", "link": "admin/coach"}
      ]
    },
    {
      "name": "Student",
      "link": "admin/student",
      "icon": "verified_user",
      "children": [
        {"name": "Create Student", "link": "admin/student/create"},
        {"name": "Manage Student", "link": "admin/student"}
      ]
    }
  ];

  ngOnInit() {
  }

}
