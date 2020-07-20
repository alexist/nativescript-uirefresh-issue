import {Component, OnDestroy, OnInit} from "@angular/core";

import {BehaviorSubject, interval, Observable, Subscription, timer} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {on as applicationOn, resumeEvent} from '@nativescript/core/application';
import {ApplicationEventData} from '@nativescript/core/nativescript-core';

@Component({
    selector: "ns-test",
    templateUrl: "./test.component.html",
})
export class TestComponent implements OnInit, OnDestroy {
    subject: BehaviorSubject<number>;
    subjectOnResume: BehaviorSubject<number>;
    obs: Observable<number>;
    obsOnResume: Observable<number>;
    sub: Subscription;
    subOnResume: Subscription;

    constructor() {
    }

    ngOnInit(): void {

        this.subject = new BehaviorSubject(0);
        this.subjectOnResume = new BehaviorSubject(0);
        this.obs = this.subject.asObservable();
        this.obsOnResume = this.subjectOnResume.asObservable();


        this.sub = interval(1000).pipe(takeUntil(timer(16000))).subscribe(count => {
            console.log("count", count);
            this.subject.next(count + 1);
        });


        applicationOn(resumeEvent, (args: ApplicationEventData) => {
            console.log("resumeEvent");

            this.subOnResume = interval(1000).pipe(takeUntil(timer(16000))).subscribe(count => {
                console.log("count onResume", count);
                this.subjectOnResume.next(count + 1);
            });
        });
    }

    ngOnDestroy() {
        if (this.subOnResume) {
            this.subOnResume.unsubscribe();
        }
        this.sub.unsubscribe();
    }
}
