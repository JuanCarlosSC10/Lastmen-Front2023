import { Component, OnInit } from '@angular/core';
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  //DECLARANDO VARIABLES
  roles: RoleModel[] = [];
  showTable:boolean = true;
  selectedRole:RoleModel = new RoleModel();
  constructor(
    /* declarando nuestros servicios */
    private _roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this._roleService.getAll().subscribe(
      (data:RoleModel[]) => {
        this.roles = data;
        console.log(this.roles);
         
      }
    );
  }

  addRole()
  {
    this.selectedRole = new RoleModel();
    this.showTable = false;
  }


  editRole(obj:RoleModel)
  {
    this.selectedRole = obj;
    this.showTable = false;
  }

  deleteRole(id:number)
  {
    let respuesta = confirm("¿Estas seguro de eliminar el registro?")
    if(respuesta)
    {
      this._roleService.delete(id).subscribe(
        (data:number)=> {
          alert("registro eliminado de forma satisfactoria");
          this.getAllRoles();
        },
        err => {
          alert("error");
        }
      );
    }
  }


  recibeCloseModal(res:boolean)
  {
    this.showTable = true;
    if(res)
    {
      this.getAllRoles();
    }
  }

}
