import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/club.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html'
})
export class ClubComponent implements OnInit {

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

  search: any = {};

  constructor(
      private clubService: ClubService,
      private responseMessage: NzMessageService
  ) { }

  sort(sort: { key: string; value: string }): void {
      this.sortKey = sort.key;
      this.sortValue = sort.value;
      this.searchData();
  }

  setSearch() {
      this.search.id = '';
      this.search.name = '';
      this.search.slug = '';
      this.search.status = '';
  }

  searchData(reset: boolean = false): void {
      if (reset) {
          this.pageIndex = 1;
      }
      this.loading = true;
      this.clubService
          .index()
          .subscribe(data => {
              this.loading = false;
              this.total = data.data.length;
              this.listOfData = data.data;
          });
  }

  updateFilter(value: string[]): void {
      this.searchGenderList = value;
      this.searchData(true);
  }

  ngOnInit(): void {
      this.setSearch();
      this.searchData();
  }

  delete(id) {
      this.clubService.distroy(id).subscribe(
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
