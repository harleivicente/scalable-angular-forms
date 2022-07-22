import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';

  tiposDePlano = [
    { id: 1, nome: 'Plano Basico', preco: 67, },
    { id: 2, nome: 'Plano Intermediario', preco: 127, },
    { id: 3, nome: 'Plano Completo', preco: 246, }
  ];

  professores = [
    { id: 1, nome: 'Bruno', idade: 34, altoCusto: false, formacao: "Fisioterapia", profileUrl: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Sunglasses&hairColor=Blue&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerShirt&clotheColor=Gray01&eyeType=Happy&eyebrowType=UnibrowNatural&mouthType=Default&skinColor=Tanned' },
    { id: 2, nome: 'Helena',  idade: 25, altoCusto: true, formacao: "Muscalação", profileUrl: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBigHair&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardMajestic&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=Black&graphicType=Pizza&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Light' },
    { id: 3, nome: 'Roberto',  idade: 41, altoCusto: false, formacao: "Natação", profileUrl: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Kurt&hatColor=Pink&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Blue01&graphicType=Skull&eyeType=Close&eyebrowType=UnibrowNatural&mouthType=Sad&skinColor=DarkBrown' }
  ];

  formGroup = new FormGroup({
    nome: new FormControl('', [ Validators.required, Validators.maxLength(20) ]),
    estado: new FormControl(null, [ Validators.required ]),
    plano: new FormControl('', [ Validators.required ]),
    professor: new FormControl('', [ Validators.required ]),
  });

  ngOnInit() {}

  professorIconClickHandler($event: MouseEvent, icon) {
    $event.stopPropagation();
    console.log(`Icone clicado: ${icon}`);
  }

  get nomeFc() {
    return this.formGroup.get('nome');
  }

  submitHandler() {
    console.log(this.formGroup.value)
  }
}
