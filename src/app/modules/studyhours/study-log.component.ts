import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { APIService } from 'src/app/_services/api.service';
import { StudyArray } from 'src/app/_interfaces/study.interface';

@Component ({
    templateUrl: './study-log.html',
})

export class StudyHoursLogComponent implements OnInit {
    StudyArray: StudyArray[];
    UniqueStudyArray: StudyArray[];
    UniqueBackupArray: StudyArray[];
    Student = '';
    options: string[] = ['One', 'Two', 'Three'];

    // Loaders
    userSelected = false;
    userLoaded = true;
    displayData = false;
    constructor(
        private api: APIService
    ) { }
    ngOnInit() {
        this.api.getStudyUnique().subscribe(res => {
            this.UniqueStudyArray = this.UniqueBackupArray = res.data;
        }, err => {

        });
    }

    _filter() {
        const filterValue = this.Student.toLowerCase();

        this.UniqueStudyArray = this.UniqueBackupArray.filter(option => option.FirstName.toLowerCase().indexOf(filterValue) === 0);
    }

    submit(form) {
        this.userSelected = true;
        this.userLoaded = false;

        this.api.getStudy().subscribe(res => {
            this.StudyArray = res.data.filter(e => {
                return e.StudentID === form && e.EndDate != null
            });
            this.userLoaded = true;
            this.displayData = true;
        }, err => {

        });
        console.log(form)
    }
}