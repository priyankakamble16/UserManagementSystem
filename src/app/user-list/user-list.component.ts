import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  submitted=false;
  formValue!: FormGroup;
  user:User=new User();
  usersall:any[]=[]
  showAdd!: boolean;
  showupdate!: boolean;
  
  constructor(private formBuilder:FormBuilder,
    private dataService:DataService
  ){}
  ngOnInit(){
    this.formValue=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
      address:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]  
    })
    this.getAllUsers();
  }

  postUserDetails(){
    this.user.firstName=this.formValue.value.firstName;
    this.user.lastName=this.formValue.value.lastName;
    this.user.email=this.formValue.value.email;
    this.user.address=this.formValue.value.address;
    this.user.phone=this.formValue.value.phone;
    this.dataService.createUser(this.user).subscribe((res:any)=>{
      console.log(res);
      alert("Student Record Added successfully");
      this.getAllUsers();
      this.formValue.reset();
    },(error:any)=>{alert("Something went wrong");})

  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd=true;
    this.showupdate=false;
  }
  get f(){
    return this.formValue.controls;
  }


  getAllUsers(){
    this.dataService.getAll().subscribe((res:any)=>{
this.usersall=res;
    })
  }

  deleteUser(data:any){
    this.dataService.deleteUser(data.id).subscribe((res:any)=>{
      alert("record deleted successfully");
      this.getAllUsers();
    })
  }

  onEdit(data:any){
    this.showAdd=false;
    this.showupdate=true;
    this.user.id=data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['phone'].setValue(data.phone);
  }

  updateUser(){
    this.user.firstName=this.formValue.value.firstName;
    this.user.lastName=this.formValue.value.lastName;
    this.user.email=this.formValue.value.email;
    this.user.address=this.formValue.value.address;
    this.user.phone=this.formValue.value.phone;
    this.dataService.updateUser(this.user.id,this.user).subscribe((res:any)=>{
      alert("Record updated successfully");
      this.formValue.reset();
      this.getAllUsers();
    })
  }
}

