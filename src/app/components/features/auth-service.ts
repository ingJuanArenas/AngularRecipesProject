import { HttpClient } from "@angular/common/http";
import { effect, Inject, Injectable, signal } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { LoginRequest, LoginResponse, User } from "./auth.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class authService {

    private readonly API_URL = 'http://localhost:8080/api/auth';

    private readonly _currentUser = signal<User | undefined>(undefined);
    private readonly _token = signal<string |undefined>(undefined);


    constructor(private http:HttpClient, private router: Router) {


        effect(()=> {
            const user = this._currentUser();
            const token = this._token();


            console.log({user, token, });
        })

                this.loadStoredUser();
    }

    login(credentials:LoginRequest): Observable<LoginResponse>{
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(response=>{
                this._token.set(response.token);
                localStorage.setItem('auth_token', response.token);
                this._currentUser.set({
                    name: response.name,
                    email: response.email,
                })
                const user ={ name: response.name, email: response.email };
                localStorage.setItem('current_user', JSON.stringify(user));
                this._currentUser.set(user);
            })
        )

    }

    logout():void{
        this._token.set(undefined);
        this._currentUser.set(undefined);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');

        this.router.navigate(['/login']);
    }

    loadStoredUser():void{
        const storedToken= localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('current_user'); 

        if(storedToken){
           try{        
            this._token.set(storedToken);
            const user= JSON.parse(storedUser!);
            this._currentUser.set(user);

           }catch(error){
            console.error('Error parsing stored user', error);
            this.logout();

        }
    }
    
    }

    isAuthenticated():boolean{
        return !!this._token();
    }

    currentUser(){
        return this._currentUser();
    }

    refreshAuthState():void{
        this.loadStoredUser();
    }
}