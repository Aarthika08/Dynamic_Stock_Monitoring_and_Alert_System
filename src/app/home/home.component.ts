import { LoginService } from '../login/loginservice'
// login.component.ts
import { Component, OnInit } from '@angular/core';
declare let Email: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  
  // sendEmail() {
  //   Email.send({
  //     Host: "smtp.elasticemail.com",
  //     Username: "19ifte048@ldc.edu.in",
  //     Password: "0C589BEA17D93DD3B70BE7D58EBE02BC3CBA",
  //     To: 'maarthika01@gmail.com',
  //     From: "19ifte048@ldc.edu.in",
  //     Subject: "This is the subject",
  //     Body: "And this is the body testing1"
  //   }).then(
  //     (message: unknown) => {
  //       console.log(message); // Log the message to the console
  //       alert("Email sent successfully");
  //     }
  //   ).catch((error:any) => {
  //     console.error('Error sending email:', error);
  //     alert("Error sending email. Please try again later.");
  //   });
  // }
}