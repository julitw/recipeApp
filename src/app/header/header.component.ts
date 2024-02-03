import { Component, OnDestroy, OnInit } from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscribable, Subscription } from 'rxjs';


@Component({
    selector: 'app-header' ,
    templateUrl: './header.component.html' ,
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    // @Output() recipesVisible = new EventEmitter<string>();
    // menuClick(el){
    //     this.recipesVisible.emit(el.target.textContent);
    // }    

    private userSub: Subscription;
    isAuthenticated = false;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){
    }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes()
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout(){
        this.authService.logout()
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }
}