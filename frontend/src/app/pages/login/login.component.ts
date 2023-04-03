import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar, private login:LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("LogIn Button clicked!")
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open("Username is required!",'',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open("Password is required!",'',{
        duration:3000
      })
      return;
    }

    // username and password are valid

    // Request server to generate token now
    this.login.generateToken(this.loginData).subscribe(
      (data: any)=>{
        console.log("success !")
        console.log(data)

        // token generated successfully ...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any)=>{
            this.login.setUserDetails(user)
            console.log(user)
            console.log(this.login.getCurrentUser())
            console.log(this.login.getUserRole())
            // redirect ... ADMIN: admin-dashboard
            // redirect ... NORMAL: normal-dashboard
            if(this.login.getUserRole() == "ADMIN"){
              // redirect to admin dashboard
              window.location.href='/admin' // reloads all components
            }
            else if(this.login.getUserRole() == "NORMAL"){
              // redirect normal user dashboard
              // All quizzes loaded when normal user logs in. - hence 0 (categoryID) is passed
              window.location.href='/user-dashboard/0'
            }
            else{
              // logout
              this.login.logout();
            }
          }
        )
      },
      (error)=>{
        console.log("error !")
        console.log(error)
        this.snack.open("Invalid credentials! Try again!", '',{
          duration:3000
        })
      }
    )

  }

}
