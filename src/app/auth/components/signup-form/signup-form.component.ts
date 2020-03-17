import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  DoCheck,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Signup } from '../../models';
import { PeselMaskConfig, PhoneNumberMaskConfig } from '@pko/shared/util';
import { PeselValidator } from '@pko/auth/validators/pesel/pesel.validator';
import { ErrorInfo } from '@pko/core/error';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'pko-signup-form',
  templateUrl: './signup-form.component.pug',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit, OnDestroy, DoCheck {
  @Input() error: ErrorInfo;
  @Output() submitted: EventEmitter<Signup> = new EventEmitter<Signup>();
  form: FormGroup;

  phoneNumberMask = new PhoneNumberMaskConfig();
  peselMask = new PeselMaskConfig();
  readonly authErrorCode = 'auth.authentication.error';

  private readonly destroyed$ = new Subject();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      phoneNumber: [null, Validators.required],
      pesel: [null, Validators.compose([
        Validators.required,
        PeselValidator.validate
      ])]
    });

    this.clearExternalErrorOnPhoneNumberChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngDoCheck(): void {
    if (this.authErrorCode === this.error?.code) {
      this.phoneNumber.setErrors({ [this.authErrorCode]: true });
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted.next(this.form.value);
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get pesel() {
    return this.form.get('pesel');
  }

  private clearExternalErrorOnPhoneNumberChange() {
    this.phoneNumber.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => this.error = null)
      )
      .subscribe();
  }
}
