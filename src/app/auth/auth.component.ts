import { NgFor } from "@angular/common";
import { Component, ComponentFactoryResolver, ViewContainerRef, Injector, OnDestroy, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { AuthResponseData } from "./auth.service";
import { Observable, Subscribable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { LoggingService } from "../logging.service";



@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
    private closeSub: Subscription;


    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, private viewContainerRef: ViewContainerRef){

    }

    onSwitchMode(){
        this.isLoginMode =  !this.isLoginMode;
        console.log(this.isLoginMode)
    }
    onSubmit(form: NgForm){
        if ( !form.valid){
            return
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        this.isLoading = true;

        if ( this.isLoginMode){
            authObs = this.authService.login(email, password)
        }

        else{
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(
            resData => {
                console.log(resData)
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            },
            errorMessage => {
                console.log(errorMessage.message);
                this.error = errorMessage.message;
                this.showErrorAlert(errorMessage.message);
                this.isLoading = false;
            }
        )
        

        form.reset();
    }

    onHandleError(){
        this.error= null;
    }


    private showErrorAlert(message: string){
        // const AlertComp = new AlertComponent(); tak źle
        // const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        // const hostViewContainer = this.alertHost.viewContainerRef;
        // hostViewContainer.clear();

        // const componentRef = alertCmpFactory.create(this.injector);
        // componentRef.instance.message = message;
        // this.closeSub = componentRef.instance.close.subscribe(() => {
        //     this.closeSub.unsubscribe();
        //     hostViewContainer.clear();
        // });

        // const hostViewContainer = this.alertHost.viewContainerRef;
        // hostViewContainer.clear();
        const component = this.viewContainerRef.createComponent(AlertComponent);
        component.instance.message = message;
        this.closeSub = component.instance.close.subscribe(() => {
            console.log('close')
             this.closeSub.unsubscribe();
            component.destroy()
    })}
 
    ngOnDestroy(): void {
        if ( this.closeSub){
            this.closeSub.unsubscribe()
        }
    }

}