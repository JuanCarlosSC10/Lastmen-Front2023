import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from 'src/app/models/common/login-request.model';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/service/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  loginRequest: LoginRequestModel = new LoginRequestModel();
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _sessionService: SesionService
  )
    
  {
    this.myForm = this.fb.group({
      usuario: [null,[Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  
    
  login() {
    this.loginRequest = this.myForm.getRawValue();
    this._authService.login(this.loginRequest).subscribe(
      (data: any) => {
        this._sessionService.setVariableSesion(data.token, data.usuario);

        this._router.navigate(["dashboard"]);
      },
      err => {
        alert("Contraseña y/o Usuario incorrecot");
        
      }
    );

  }

}
