import { AbstractControl, ValidationErrors } from '@angular/forms';

export function trueIndexes(array: boolean[]): number[] {
  return array.map((bool, i) => (bool ? i : -1)).filter((num) => num >= 0);
}
export function profileChecked(array: string[]): boolean[] {
  /*
  const perfis = [false, false, true];
  const labels = ['ADMIN', 'CLIENTE', 'TECNICO',];

  perfis.forEach((_, i) => {
    perfis[i] = array.includes(labels[i]);
  });

  return perfis;
  */
  return [
    array.includes('ADMIN'),
    array.includes('CLIENTE'),
    array.includes('TECNICO'),
  ];
  // Object.keys(Perfil).map((perfil) => array.includes(perfil));
}

// 0 = ADMIN, 1 = CLIENTE, 2 = TECNICO ===> [false, false, false]
export function someTrue(control: AbstractControl): ValidationErrors | null {
  return !control.value.some((v: boolean) => v) ? { sometrue: true } : null;
}
