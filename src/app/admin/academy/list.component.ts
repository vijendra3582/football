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
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listOfData: any = [];
    loading = true;
    sortValue: string | null = null;
    sortKey: string | null = null;
    searchGenderList: string[] = [];

    constructor(
        private academyService: AcademyService,
        private responseMessage: NzMessageService
    ) { }

    sort(sort: { key: string; value: string }): void {
        this.sortKey = sort.key;
        this.sortValue = sort.value;
        this.searchData();
    }

    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.academyService
            .all(this.pageIndex, this.pageSize, this.sortKey!, this.sortValue!, this.searchGenderList)
            .subscribe(data => {
                this.loading = false;
                this.total = data.data.count[0].count;
                this.listOfData = data.data.response;
            });
    }

    updateFilter(value: string[]): void {
        this.searchGenderList = value;
        this.searchData(true);
    }

    ngOnInit(): void {
        this.searchData();
    }

    deleteAcademy(id, index) {
        this.academyService.delete(id).subscribe(
            result => this.handleResponse(result),
            error => this.handleError(error)
        )
    }

    handleResponse(data) {
        if (data.status == true) {
            this.responseMessage.success(data.message, { nzDuration: 2000 });
            this.searchData();
        } else {
            this.responseMessage.error(data.message, { nzDuration: 2000 });
        }
    }

    handleError(error) {
        this.responseMessage = error.error.message.errors;
    }
}
