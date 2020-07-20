import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";


import { TestComponent } from "./item/test.component";
import {HomeComponent} from "./item/home.component";
import {TestResumeComponent} from "./item/test-resume.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "test", component: TestComponent },
    { path: "test-resume", component: TestResumeComponent}
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
