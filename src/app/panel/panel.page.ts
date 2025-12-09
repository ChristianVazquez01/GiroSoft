// import { Component, OnInit } from '@angular/core';
// import { RedireccionamientoService } from '../services/redireccionamiento.service'
// import { LoginserviceService } from '../services/loginservice.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { LoadingController, ToastController } from '@ionic/angular';
// import { RegistroService } from '../services/registro.service';



// @Component({
//   selector: 'app-panel',
//   templateUrl: './panel.page.html',
//   styleUrls: ['./panel.page.scss'],
// })
// export class PanelPage implements OnInit {
//   nombreUsuario: string = '';
//   pdfUrl: SafeResourceUrl;
//   registros: any[] = [];

//   constructor(
//     private redireccionamiento: RedireccionamientoService,
//     private auth: LoginserviceService,
//     private sanitizer: DomSanitizer,
//     private loadingController: LoadingController,
//     private toastController: ToastController,
//     private registroService: RegistroService
//   ) {
//     this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/docs/girosoft.pdf#toolbar=0&navpanes=0');
//   }

//   nav(data: string) {
//     this.redireccionamiento.redireccion(data);
//   }

//   ngOnInit() {
//     this.registroService.obtenerRegistros().subscribe(data => {
//       this.registros = data;
//     });
//     const usuario = this.auth.obtenerUsuario();
//     if (usuario) {
//       this.nombreUsuario = usuario.nombre;
//       console.log("Usuario:", usuario);
//     }
//   }

//   // Función de descarga mejorada
//   async obtenerRegistros() {
//     const loading = await this.loadingController.create({
//       message: 'Descargando PDF...',
//       spinner: 'crescent'
//     });
    
//     await loading.present();

//     try {
//       // Simular la descarga - reemplaza esto con tu servicio real
//       const response = await fetch('/api/registro');
//       const blob = await response.blob();
      
      
//       loading.dismiss();

//       // Crear URL y descargar
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `girosoft_${this.nombreUsuario || 'documento'}.pdf`;
      
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
      
//       // Liberar memoria
//       window.URL.revokeObjectURL(url);

//       this.mostrarExito('PDF descargado correctamente');
      
//     } catch (error) {
//       loading.dismiss();
//       console.error('Error al descargar:', error);
//       this.mostrarError('No se pudo descargar el PDF');
//     }
//   }

//   // Función alternativa si tienes un servicio específico
//   descargarConServicio() {
//     // this.pdfService.descargarPDF().subscribe({
//     //   next: (data: Blob) => {
//     //     const url = window.URL.createObjectURL(data);
//     //     const a = document.createElement('a');
//     //     a.href = url;
//     //     a.download = `documento_${this.nombreUsuario}.pdf`;
//     //     document.body.appendChild(a);
//     //     a.click();
//     //     document.body.removeChild(a);
//     //     window.URL.revokeObjectURL(url);
//     //   },
//     //   error: (error) => {
//     //     console.error('Error:', error);
//     //     this.mostrarError('Error en la descarga');
//     //   }
//     // });
//   }

//   private async mostrarExito(mensaje: string) {
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: 2000,
//       color: 'success',
//       position: 'bottom'
//     });
//     toast.present();
//   }

//   private async mostrarError(mensaje: string) {
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: 3000,
//       color: 'danger',
//       position: 'bottom'
//     });
//     toast.present();
//   }
// }
// 
import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service'
import { LoginserviceService } from '../services/loginservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';
import { RegistroService } from '../services/registro.service';

// IMPORTACIÓN CORREGIDA
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  nombreUsuario: string = '';
  pdfUrl: SafeResourceUrl;
  registros: any[] = [];

  constructor(
    private redireccionamiento: RedireccionamientoService,
    private auth: LoginserviceService,
    private sanitizer: DomSanitizer,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private registroService: RegistroService
  ) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/docs/girosoft.pdf#toolbar=0&navpanes=0');
  }

  nav(data: string) {
    this.redireccionamiento.redireccion(data);
  }

  ngOnInit() {
    this.registroService.obtenerRegistros().subscribe({
      next: (data: any[]) => {
        this.registros = data;
        console.log('Registros cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar registros:', error);
        this.mostrarError('No se pudieron cargar los registros');
      }
    });

    const usuario = this.auth.obtenerUsuario();
    if (usuario) {
      this.nombreUsuario = usuario.nombre;
      console.log("Usuario:", usuario);
    }
  }

  async descargarPDF() {
    const loading = await this.loadingController.create({
      message: 'Generando PDF...',
      spinner: 'crescent'
    });
    
    await loading.present();

    this.registroService.obtenerRegistros().subscribe({
      next: (datos: any[]) => {
        try {
          if (!datos || datos.length === 0) {
            throw new Error('No hay registros para exportar');
          }

          const doc = new jsPDF();

          // Título
          doc.setFontSize(16);
          doc.text('REPORTE DE REGISTROS', 20, 20);
          
          // Información
          doc.setFontSize(10);
          doc.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, 20, 30);
          doc.text(`Usuario: ${this.nombreUsuario || 'Sistema'}`, 20, 35);
          doc.text(`Total de registros: ${datos.length}`, 20, 40);

          // Preparar datos para la tabla
          const headers = ['ID', 'Material', 'Cantidad', 'Proveedor', 'Fecha', 'Recibido por', 'Entregado por'];
          
          const rows = datos.map((registro: any) => [
            registro.reg_id?.toString() || '',
            registro.mat_nombre || '',
            registro.reg_cantidad?.toString() || '',
            registro.prov_empresa || '',
            this.formatearFecha(registro.reg_fecha),
            registro.enc_nombre || '',
            registro.prov_nombre || ''
          ]);

          // USO CORRECTO DE autoTable
          autoTable(doc, {
            head: [headers],
            body: rows,
            startY: 45,
            styles: { fontSize: 8 },
            headStyles: { 
              fillColor: [41, 128, 185],
              textColor: 255,
              fontStyle: 'bold'
            },
            alternateRowStyles: { 
              fillColor: [245, 245, 245]
            }
          });

          // Guardar el PDF
          doc.save(`registros_${this.nombreUsuario || 'sistema'}_${new Date().getTime()}.pdf`);
          
          loading.dismiss();
          this.mostrarExito('PDF generado correctamente');

        } catch (error) {
          loading.dismiss();
          console.error('Error al generar PDF:', error);
          
          if (error instanceof Error) {
            this.mostrarError('Error al generar el PDF: ' + error.message);
          } else {
            this.mostrarError('Error al generar el PDF: Error desconocido');
          }
        }
      },
      error: (error) => {
        loading.dismiss();
        console.error('Error al obtener registros:', error);
        
        if (error.status === 401 || error.status === 403) {
          this.mostrarError('No tienes permisos. Inicia sesión nuevamente.');
        } else if (error.status === 404) {
          this.mostrarError('La API no está disponible.');
        } else {
          if (error instanceof Error) {
            this.mostrarError('Error del servidor: ' + error.message);
          } else {
            this.mostrarError('Error del servidor: Error desconocido');
          }
        }
      }
    });
  }

  // Función auxiliar para formatear fecha
  private formatearFecha(fecha: any): string {
    if (!fecha) return '';
    try {
      return new Date(fecha).toLocaleDateString('es-MX');
    } catch (error) {
      return 'Fecha inválida';
    }
  }

  private async mostrarExito(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  private async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
}