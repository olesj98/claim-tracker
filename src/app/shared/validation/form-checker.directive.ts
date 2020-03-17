import { Directive, DoCheck, ElementRef, Host, OnDestroy, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormControlDirective, FormGroup, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { SignupComponent } from '@pko/auth/containers/signup/signup.component';
import { SignupFormComponent } from '@pko/auth/components/signup-form/signup-form.component';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[appFormChecker]'
})
export class FormCheckerDirective implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject();

  constructor(private _fbDirective: FormGroupDirective) { }

  ngOnInit(): void {
    this._fbDirective.ngSubmit
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => this.updateAndValidateAll(this._fbDirective.form))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private updateAndValidateAll(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);

      if (control instanceof FormControl && control.invalid) {
        control.markAsTouched();
      } else if (control instanceof FormGroup && control.invalid) {
        this.updateAndValidateAll(control);
      } else if (control instanceof FormArray && control.invalid) {
        control.controls.forEach(c => this.updateAndValidateAll(c as FormGroup));
      }
    });
  }
}


