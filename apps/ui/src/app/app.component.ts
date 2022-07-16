import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';
  submitted = false;

  formGroup = new FormGroup({
    nome: new FormControl('', [ Validators.required, Validators.maxLength(20) ]),
    estado: new FormControl('', [ Validators.required ])
  });

  ngOnInit() {}

  get nomeFc() {
    return this.formGroup.get('nome');
  }

  submitHandler(data) {
    this.submitted = true;
    console.log(this.formGroup.value)
  }
}
