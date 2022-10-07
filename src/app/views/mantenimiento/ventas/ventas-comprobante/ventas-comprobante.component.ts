import { Component, Input, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/clientes.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { VentasModel } from 'src/app/models/ventas.model';
import { ClientesService } from 'src/app/service/clientes.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-ventas-comprobante',
  templateUrl: './ventas-comprobante.component.html',
  styleUrls: ['./ventas-comprobante.component.css']
})
export class VentasComprobanteComponent implements OnInit {
  @Input() venta: VentasModel = new VentasModel();

  cliente: ClienteModel = new ClienteModel();
  usuario: UsuarioModel = new UsuarioModel();
  producto: ProductoModel[] = [];
  total: number = 0;
  constructor(
    private _clienteservice: ClientesService,
    private _usuarioservice: UsuarioService,
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    console.log(this.venta);
    this.obetenerCliente();
    this.obtenerproducto();
    this.venta.detalleVentas.forEach(x => {
      this.total = this.total + (x.precioVenta * x.cantidad);

    });

  }


  obtenerproducto() {
    this._productoService.getAll().subscribe(
      (data: ProductoModel[]) => {
        this.producto = data;
        this.venta.detalleVentas.forEach(x => {

          let prod = this.producto.filter(p => p.idProducto == x.idProducto)[0];
          x.producto = prod;
        });
        debugger;
      },
      err => {
        console.log(err);
      }
    );
  }

  obetenerCliente() {
    this._clienteservice.getById(this.venta.idCliente).subscribe(
      (data: any) => {

        this.cliente = data;

        console.log(data);
      }
    );
  }
  obtenerUsuario() {

  }
  PrintElem() {
    var mywindow: any = window.open('', 'PRINT', 'height=400,width=600');
    let html = document.getElementById("app2")?.innerHTML;
    mywindow.document.write('<html><head><title>' + document.title + 'COMPROBANTE');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(html);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
  }
}
