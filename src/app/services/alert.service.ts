import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private base = Swal.mixin({
    customClass: {
      popup:         'swal-popup',
      title:         'swal-title',
      htmlContainer: 'swal-html',
      confirmButton: 'swal-btn-confirm',
      cancelButton:  'swal-btn-cancel',
      icon:          'swal-icon',
    },
    buttonsStyling: false,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  });

  // ── Succès ───────────────────────────────────────────
  success(title: string, text?: string): Promise<SweetAlertResult> {
    return this.base.fire({ icon: 'success', title, text, timer: 2800, showConfirmButton: false });
  }

  // ── Erreur ───────────────────────────────────────────
  error(title: string, text?: string): Promise<SweetAlertResult> {
    return this.base.fire({ icon: 'error', title, text, confirmButtonText: 'Fermer' });
  }

  // ── Avertissement ────────────────────────────────────
  warning(title: string, text?: string): Promise<SweetAlertResult> {
    return this.base.fire({ icon: 'warning', title, text, confirmButtonText: 'OK' });
  }

  // ── Info ─────────────────────────────────────────────
  info(title: string, text?: string): Promise<SweetAlertResult> {
    return this.base.fire({ icon: 'info', title, text, confirmButtonText: 'OK' });
  }

  // ── Confirmation ─────────────────────────────────────
  confirm(title: string, text?: string, confirmText = 'Confirmer', cancelText = 'Annuler'): Promise<SweetAlertResult> {
    return this.base.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    });
  }

  // ── Suppression ──────────────────────────────────────
  confirmDelete(itemName?: string): Promise<SweetAlertResult> {
    return this.base.fire({
      icon: 'warning',
      title: 'Confirmer la suppression',
      text: itemName ? `Voulez-vous vraiment supprimer "${itemName}" ? Cette action est irréversible.` : 'Cette action est irréversible.',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        popup:         'swal-popup',
        title:         'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal-btn-delete',
        cancelButton:  'swal-btn-cancel',
      },
    });
  }

  // ── Toast (notification légère) ──────────────────────
  toast(icon: 'success' | 'error' | 'warning' | 'info', title: string): Promise<SweetAlertResult> {
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      customClass: { popup: 'swal-toast' },
    }).fire({ icon, title });
  }

  // ── Chargement ───────────────────────────────────────
  loading(title = 'Chargement…'): void {
    this.base.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });
  }

  close(): void {
    Swal.close();
  }
}
