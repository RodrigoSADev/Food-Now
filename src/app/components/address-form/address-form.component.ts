import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { Cep } from 'src/app/interfaces/cep.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent implements OnInit {
  formBuild = inject(FormBuilder);
  cepService = inject(CepService);

  addressForm = this.formBuild.group({
    cep: [''],
    cidade: [''],
    bairro: [''],
    rua: [''],
    numero: [''],
    complemento: [''],
    saveAddress: [false],
  });

  ngOnInit(): void {
    // Carregar endereço salvo do localStorage, se existir
    const savedAddress = localStorage.getItem('savedAddress');
    if (savedAddress) {
      const addressData = JSON.parse(savedAddress);
      this.addressForm.patchValue(addressData);
      this.addressForm.get('saveAddress')?.setValue(true);
    }

    // Ouvir mudanças no checkbox
    this.addressForm.get('saveAddress')?.valueChanges.subscribe((isChecked) => {
      if (isChecked) {
        this.saveAddressToLocalStorage();
        this.enableAutoSave();
      } else {
        localStorage.removeItem('savedAddress');
      }
    });

    // Se o checkbox já estava marcado, ativar o autosave
    if (this.addressForm.get('saveAddress')?.value) {
      this.enableAutoSave();
    }
  }

  enableAutoSave(): void {
    this.addressForm.valueChanges.subscribe(() => {
      if (this.addressForm.get('saveAddress')?.value) {
        this.saveAddressToLocalStorage();
      }
    });
  }

  saveAddressToLocalStorage(): void {
    const addressData = {
      cep: this.addressForm.get('cep')?.value,
      cidade: this.addressForm.get('cidade')?.value,
      bairro: this.addressForm.get('bairro')?.value,
      rua: this.addressForm.get('rua')?.value,
      numero: this.addressForm.get('numero')?.value,
      complemento: this.addressForm.get('complemento')?.value,
    };

    localStorage.setItem('savedAddress', JSON.stringify(addressData));
  }
  onBlurCep() {
    let cep = this.addressForm.get('cep')?.value;
    // Verificar se o Cep tem somente dígitos
    cep = cep?.replace(/\D/g, '');
    if (cep !== null && cep !== undefined && cep !== '') {
      // Regex para validar o Cep
      const validaCep = /^[0-9]{8}$/;
      if (validaCep.test(cep)) {
        this.cepService.searchCep(cep).subscribe((cep: Cep) => {
          this.addressForm.patchValue({
            cidade: cep.localidade,
            bairro: cep.bairro,
            rua: cep.logradouro,
          });
        });
      }
    }
  }
}
