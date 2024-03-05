
// import { Injectable } from '@angular/core';

//   @Injectable({
//     providedIn: 'root'
//   })
//   export class AuthService {
//     private isLoggedIn = false;
//     private isAdmin = false; // Assuming isAdmin property to determine admin status    
    

  
//     login() {
//       this.isLoggedIn = true;     
//       this.isAdmin = true;
//     }
  
//     logout() {
//       this.isLoggedIn = false;
//       this.isAdmin = false; 
//     }
  
//     isAuthenticated(): boolean {
//       return this.isLoggedIn;
//     }
  
//     isAdminUser(): boolean {
//       return this.isAdmin;
//     }
  
//   }
 
// 2 it works correct 



// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedIn = false;
//   private currentUser: any; // Assuming currentUser contains role information

//   login(user: any) {
//     this.isLoggedIn = true;
//     this.currentUser = user;
//   }

//   logout() {
//     this.isLoggedIn = false;
//     this.currentUser = undefined;
//   }

//   isAuthenticated(): boolean {
//     return this.isLoggedIn;
//   }

//   isAdminUser(): boolean {
//     return this.currentUser?.role === 'Admin';
//   }

//   isStockUser(): boolean {
//     return this.currentUser?.role === 'Staff';
//   }

//   isRealUser(): boolean {
//     return this.currentUser?.role === 'Manager';
//   }
// }



import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: any; // Assuming currentUser contains role information
  private isAdmin = false;
  private isStaff = false;
  private isManager = false;

  login(user: any) {
    this.isLoggedIn = true;
    this.currentUser = user;

    // Set flags based on user role
    if (user.role === 'Admin') {
      this.isAdmin = true;
    } else if (user.role === 'Staff') {
      this.isStaff = true;
    } else if (user.role === 'Manager') {
      this.isManager = true;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = undefined;
    // Reset flags on logout
    this.isAdmin = false;
    this.isStaff = false;
    this.isManager = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isStockUser(): boolean {
    return this.isStaff;
  }

  isRealUser(): boolean {
    return this.isManager;
  }
}
