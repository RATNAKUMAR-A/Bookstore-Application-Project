import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuthService } from "./user-auth.service";
import { User } from "../_model/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders({ "No-Auth": "True" });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(registerData) {
    return this.httpclient.post(
      this.PATH_OF_API + "/registerNewUser",
      registerData
    );
  }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + "/forUser", {
      responseType: "text",
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + "/forAdmin", {
      responseType: "text",
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      // for (let i = 0; i < userRoles.length; i++) {
      //   for (let j = 0; j < allowedRoles.length; j++) {
      //     if (userRoles[i].roleName === allowedRoles[j]) {
      //       isMatch = true;
      //       return isMatch;
      //     } else {
      //       return isMatch;
      //     }
      //   }
      // }
      for (let j = 0; j < allowedRoles.length; j++) {
        //console.log(allowedRoles);
        //console.log(userRoles.roleName);
        if (userRoles.roleName === allowedRoles[j]) {
          isMatch = true;
          return isMatch;
        }
      }
      
          return isMatch;
        

      }


      
  }
  public getUser(userName: string) {
    return this.httpclient.get<User>(
      "http://localhost:9090/myProfile/" + userName
    );
  }

  public deleteAccount(userName: string) {
    return this.httpclient.delete(
      "http://localhost:9090/deleteAccount/" + userName
    );
  }

  public updateUser(updateData) {
    return this.httpclient.put(this.PATH_OF_API + "/updateUser", updateData);
  }
}
