import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { Cep } from 'src/app/interfaces/cep.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Address } from 'src/app/interfaces/address.interface';

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
  checkoutService = inject(CheckoutService);

  addressForm: FormGroup = this.formBuild.group({
    cep: ['', [Validators.required, Validators.minLength(8)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    neighborhood: ['', [Validators.required, Validators.minLength(5)]],
    street: ['', [Validators.required, Validators.minLength(5)]],
    number: ['', [Validators.required, Validators.minLength(1)]],
    complement: [''],
    saveAddress: [false],
  });

  ngOnInit(): void {
    // Carregar endereço salvo do localStorage, se existir
    const savedAddress = localStorage.getItem('savedAddress');
    if (savedAddress) {
      const addressData = JSON.parse(savedAddress);
      this.addressForm.patchValue(addressData);
      this.addressForm.get('saveAddress')?.setValue(true);
      this.checkoutService.address.set(addressData);
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
    } else {
      this.checkoutService.setAddress({
        cep: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        complement: '',
      });
    }
  }

  enableAutoSave(): void {
    // Salvar o endereço automaticamente quando houver mudanças no formulário
    this.addressForm.valueChanges.subscribe(() => {
      if (this.addressForm.get('saveAddress')?.value) {
        this.saveAddressToLocalStorage();
      }
    });
  }

  saveAddressToLocalStorage(): void {
    // Salvar o endereço no localStorage para ser carregado posteriormente
    const addressData = {
      cep: this.addressForm.get('cep')?.value,
      city: this.addressForm.get('city')?.value,
      neighborhood: this.addressForm.get('neighborhood')?.value,
      street: this.addressForm.get('street')?.value,
      number: this.addressForm.get('number')?.value,
      complement: this.addressForm.get('complement')?.value,
    };

    localStorage.setItem('savedAddress', JSON.stringify(addressData));
  }
  onBlurCep() {
    // Remover caracteres não numéricos do Cep e verificar se o Cep está preenchido
    let cep = this.addressForm.get('cep')?.value;
    // Verificar se o Cep tem somente dígitos
    cep = cep?.replace(/\D/g, '');
    if (cep !== null && cep !== undefined && cep !== '') {
      // Regex para validar o Cep
      const validaCep = /^[0-9]{8}$/;
      if (validaCep.test(cep)) {
        // Buscar dados do Cep usando a API
        this.cepService.searchCep(cep).subscribe((cep: Cep) => {
          this.addressForm.patchValue({
            city: cep.localidade,
            neighborhood: cep.bairro,
            street: cep.logradouro,
          });
        });
      }
    }
  }

  onUpdateAddress(): void {
    // Atualiza o signal no serviço sempre que houver mudança
    this.checkoutService.setAddress(this.addressForm.value);
    if (this.addressForm.valid) {
      this.checkoutService.showAddressErrorMessage.set(false);
    } else {
      this.checkoutService.showAddressErrorMessage.set(true);
    }
  }
}
