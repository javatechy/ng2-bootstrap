// Main app compnent
import { Component } from '@angular/core';
import {PostsService} from "./services/posts.service";

// Decorator
@Component({
  selector: 'my-app',
  // refers to index.html
  //template: `<h1>Hello {{name}}</h1>`,
  /*template: `<ul>
<li><a routerLink="/">Home</a></li><router-outlet></router-outlet>
<li><a routerLink="/about">About</a></li>
<li><a routerLink="/home">Home</a></li>
</ul><hr/>`,*/
  templateUrl: '../app/html/home.html'
})
export class AppComponent  {
  name :string;
  email :string;
  address :address;
  hobbies :string[];
  showHobbies :boolean;
  posts:Post[];
  constructor(){
    this.name = 'ZAUTO APP';
    this.email = 'deepak@gmail.com';
    this.address = {
      street :'1St Street',
      houseNumber : 1102
    };
    this.hobbies =['music','sports'];
    this.showHobbies=false;
  }
  addHobby(hobby: string){
    this.hobbies.push(hobby);
  }
  toggleHobbies(){
    if(this.showHobbies==true){
      this.showHobbies=false;
    }else{
      this.showHobbies=true;
    }
  }
  deleteHobby(i :number){
    this.hobbies.splice(i,1);
  }
}
interface  address{
  street : string;
  houseNumber:number
}

interface  Post{
  id:number;
  userId: number;
  body:string;
  title:string
}
