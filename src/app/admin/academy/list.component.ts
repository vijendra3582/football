import { Component, OnInit } from '@angular/core';
import { AcademyService } from 'src/app/services/academy.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-academy-list',
    templateUrl: './list.component.html'
})

export class AcademyListComponent implements OnInit {

    academies: any = [];
    listOfDisplayData: any = [];

    constructor(
        private academyService: AcademyService,
        private responseMessage: NzMessageService
    ) { }

    ngOnInit() {
        this.getAcademies();
    }

    getAcademies() {
        this.academyService.all().subscribe(
            result => {
                if (result.status)
                    this.academies = result.data;
                this.listOfDisplayData = this.academies;
            }
        )
    }

    deleteAcademy(id) {
        this.academyService.delete(id).subscribe(
            result => {
                if (result.status == true) {
                    this.responseMessage.success(result.message, { nzDuration: 2000 });
                    this.getAcademies();
                } else {
                    this.responseMessage.error(result.message, { nzDuration: 2000 });
                }
            }
        )
    }
}
