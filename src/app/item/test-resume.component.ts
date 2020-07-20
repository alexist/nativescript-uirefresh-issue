import {Component, OnDestroy, OnInit} from "@angular/core";

import {BehaviorSubject, interval, Observable, Subscription, timer} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {on as applicationOn, resumeEvent} from '@nativescript/core/application';
import {ApplicationEventData} from '@nativescript/core/nativescript-core';

@Component({
    selector: "ns-test",
    templateUrl: "./test-resume.component.html",
})
export class TestResumeComponent implements OnInit, OnDestroy {

    subjectOnResume: BehaviorSubject<number>;
    obsOnResume: Observable<number>;
    subOnResume:Subscription;
    constructor(

    ) {}

    ngOnInit(): void {

        this.subjectOnResume = new BehaviorSubject(0);
        this.obsOnResume = this.subjectOnResume.asObservable();

        applicationOn(resumeEvent, (args: ApplicationEventData) => {
            console.log("resumeEvent");

           this.subOnResume= interval(1000).pipe(takeUntil(timer(16000))).subscribe(count =>{
                console.log("count onResume", count);
                this.subjectOnResume.next(count+1);
            });
        });
    }

    ngOnDestroy() {
        if (this.subOnResume) {
            this.subOnResume.unsubscribe();
        }
    }
}
